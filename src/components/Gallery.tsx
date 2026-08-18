import { useState, useEffect, useCallback, useRef } from 'react'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  Play,
  Pause,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react'

const imageModules = import.meta.glob('../../public/gallery/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const images: string[] = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url as string)

// Thumbnails livianos generados con scripts/generate-gallery-thumbs.mjs
// (public/gallery-thumb/*.webp). Si todavía no corriste el script, cae
// de vuelta a las imágenes originales para no romper nada.
const thumbModules = import.meta.glob('../../public/gallery-thumb/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const thumbImages: string[] = Object.entries(thumbModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url as string)

const stageImages = thumbImages.length === images.length ? thumbImages : images

const ROTATIONS = [
  '-rotate-[1.2deg]',
  'rotate-[0.8deg]',
  'rotate-[1.4deg]',
  '-rotate-[0.6deg]',
  'rotate-[0.5deg]',
  '-rotate-[1deg]',
]

// ---- deterministic scatter layout for the explorable stage ----
function seededRandom(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

const CARD_SIZE = 230
const CANVAS_PADDING = 140
// si una card se ve en pantalla más chica que esto (px), no tiene sentido
// pagar el costo de red por ella todavía — el usuario no distingue el detalle
const MIN_RENDER_PX = 64
// margen extra alrededor del viewport visible para precargar antes de que
// la card entre en pantalla, sin llegar a cargar todo el canvas
const VIEWPORT_BUFFER = 260
const GRID_COLS = Math.max(4, Math.round(Math.sqrt(images.length * 1.5)))
const GRID_ROWS = Math.ceil(images.length / GRID_COLS) || 1
const CANVAS_WIDTH = GRID_COLS * CARD_SIZE + CANVAS_PADDING * 2
const CANVAS_HEIGHT = GRID_ROWS * CARD_SIZE + CANVAS_PADDING * 2

const positions = images.map((_, i) => {
  const col = i % GRID_COLS
  const row = Math.floor(i / GRID_COLS)
  const jitterX = (seededRandom(i) - 0.5) * CARD_SIZE * 0.6
  const jitterY = (seededRandom(i + 500) - 0.5) * CARD_SIZE * 0.6
  return {
    x: col * CARD_SIZE + jitterX + CANVAS_PADDING,
    y: row * CARD_SIZE + jitterY + CANVAS_PADDING,
  }
})

function Lightbox({
  images,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[]
  selectedIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(onNext, 2500)
    return () => clearInterval(id)
  }, [playing, onNext])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        aria-label="Cerrar"
      >
        <X size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
        aria-label="Foto anterior"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
        aria-label="Foto siguiente"
      >
        <ChevronRight size={28} />
      </button>

      <img
        src={images[selectedIndex]}
        alt={`Foto del proyecto ${selectedIndex + 1}`}
        className="max-h-[85vh] max-w-[90vw] rounded-[16px] object-contain select-none"
        onClick={(e) => e.stopPropagation()}
        draggable={false}
      />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/10 px-4 py-1.5 font-mono text-sm text-white/70">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setPlaying(!playing)
          }}
          className="text-white/70 hover:text-white transition-colors"
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <span>{selectedIndex + 1} / {images.length}</span>
      </div>
    </div>
  )
}

// ---- explorable pan/zoom stage (desktop & tablet) ----
function GalleryStage({ onSelect }: { onSelect: (i: number) => void }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const view = useRef({ tx: 0, ty: 0, scale: 1 })
  const drag = useRef({
    active: false,
    moved: false,
    startX: 0,
    startY: 0,
    startTx: 0,
    startTy: 0,
  })
  // trackea cada dedo activo por pointerId, para poder detectar pinch (2 dedos)
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map())
  const pinch = useRef({
    active: false,
    startDist: 0,
    startScale: 1,
    anchorCanvasX: 0,
    anchorCanvasY: 0,
  })

  const [visible, setVisible] = useState<Set<number>>(new Set())
  const lastVisUpdate = useRef(0)
  const wheelSettleTimeout = useRef<number>()

  const applyTransform = () => {
    if (canvasRef.current) {
      canvasRef.current.style.transform = `translate(${view.current.tx}px, ${view.current.ty}px) scale(${view.current.scale})`
    }
  }

  // Decide qué cards realmente montan una <img>: tiene que estar dentro
  // del viewport (+ buffer) Y verse suficientemente grande como para que
  // valga la pena pagar la descarga.
  const computeVisible = useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const { tx, ty, scale } = view.current
    const onScreenSize = CARD_SIZE * scale

    if (onScreenSize < MIN_RENDER_PX) {
      setVisible(new Set())
      return
    }

    const vw = vp.clientWidth
    const vh = vp.clientHeight
    const left = -tx / scale - VIEWPORT_BUFFER
    const top = -ty / scale - VIEWPORT_BUFFER
    const right = (-tx + vw) / scale + VIEWPORT_BUFFER
    const bottom = (-ty + vh) / scale + VIEWPORT_BUFFER

    const next = new Set<number>()
    positions.forEach((p, i) => {
      if (p.x + CARD_SIZE >= left && p.x <= right && p.y + CARD_SIZE >= top && p.y <= bottom) {
        next.add(i)
      }
    })
    setVisible(next)
  }, [])

  const fitToView = useCallback(() => {
    const vp = viewportRef.current
    if (!vp) return
    const vw = vp.clientWidth
    const vh = vp.clientHeight
    const fitScale = Math.min(vw / CANVAS_WIDTH, vh / CANVAS_HEIGHT) * 0.92
    view.current.scale = fitScale
    view.current.tx = (vw - CANVAS_WIDTH * fitScale) / 2
    view.current.ty = (vh - CANVAS_HEIGHT * fitScale) / 2
    applyTransform()
    computeVisible()
  }, [computeVisible])

  useEffect(() => {
    fitToView()
    window.addEventListener('resize', fitToView)
    return () => window.removeEventListener('resize', fitToView)
  }, [fitToView])

  const beginPinch = (vp: HTMLDivElement) => {
    const pts = [...pointers.current.values()]
    if (pts.length < 2) return
    const [p1, p2] = pts
    const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
    const midX = (p1.x + p2.x) / 2
    const midY = (p1.y + p2.y) / 2
    const rect = vp.getBoundingClientRect()
    const localMidX = midX - rect.left
    const localMidY = midY - rect.top
    pinch.current = {
      active: true,
      startDist: dist || 1,
      startScale: view.current.scale,
      anchorCanvasX: (localMidX - view.current.tx) / view.current.scale,
      anchorCanvasY: (localMidY - view.current.ty) / view.current.scale,
    }
    drag.current.active = false
  }

  const onPointerDown = (e: React.PointerEvent) => {
    const vp = viewportRef.current
    if (!vp) return
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

    if (pointers.current.size >= 2) {
      beginPinch(vp)
      return
    }

    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startY: e.clientY,
      startTx: view.current.tx,
      startTy: view.current.ty,
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const vp = viewportRef.current
    if (!vp) return

    if (pointers.current.has(e.pointerId)) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    }

    if (pinch.current.active && pointers.current.size >= 2) {
      const [p1, p2] = [...pointers.current.values()]
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y)
      const midX = (p1.x + p2.x) / 2
      const midY = (p1.y + p2.y) / 2
      const rect = vp.getBoundingClientRect()
      const localMidX = midX - rect.left
      const localMidY = midY - rect.top
      const ratio = dist / pinch.current.startDist
      const nextScale = Math.min(2, Math.max(0.25, pinch.current.startScale * ratio))
      view.current.scale = nextScale
      view.current.tx = localMidX - pinch.current.anchorCanvasX * nextScale
      view.current.ty = localMidY - pinch.current.anchorCanvasY * nextScale
      applyTransform()

      const now = performance.now()
      if (now - lastVisUpdate.current > 120) {
        lastVisUpdate.current = now
        computeVisible()
      }
      return
    }

    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) drag.current.moved = true
    view.current.tx = drag.current.startTx + dx
    view.current.ty = drag.current.startTy + dy
    applyTransform()

    // no recalculamos visibilidad en cada pixel de drag, solo cada ~120ms
    const now = performance.now()
    if (now - lastVisUpdate.current > 120) {
      lastVisUpdate.current = now
      computeVisible()
    }
  }

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId)

    if (pointers.current.size >= 2) {
      // sigue habiendo pinch con los dedos restantes: recalibrar sin salto
      const vp = viewportRef.current
      if (vp) beginPinch(vp)
      return
    }

    if (pinch.current.active && pointers.current.size === 1) {
      // quedó un solo dedo tras un pinch: retomar el pan desde ahí sin saltos
      pinch.current.active = false
      const [remaining] = [...pointers.current.values()]
      drag.current = {
        active: true,
        moved: true,
        startX: remaining.x,
        startY: remaining.y,
        startTx: view.current.tx,
        startTy: view.current.ty,
      }
      return
    }

    pinch.current.active = false
    drag.current.active = false
    computeVisible()
  }

  // React registra los listeners de wheel como "passive" por defecto desde
  // la v17, así que un preventDefault() puesto en un prop onWheel se ignora
  // y la página igual scrollea. Lo enganchamos como listener nativo con
  // { passive: false } para poder frenar el scroll de verdad.
  useEffect(() => {
    const vp = viewportRef.current
    if (!vp) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = vp.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const prevScale = view.current.scale
      const delta = -e.deltaY * 0.0012
      const nextScale = Math.min(2, Math.max(0.25, prevScale + delta * prevScale))
      view.current.tx = mx - ((mx - view.current.tx) / prevScale) * nextScale
      view.current.ty = my - ((my - view.current.ty) / prevScale) * nextScale
      view.current.scale = nextScale
      applyTransform()

      // el wheel dispara muchos eventos seguidos: esperamos a que se calme
      window.clearTimeout(wheelSettleTimeout.current)
      wheelSettleTimeout.current = window.setTimeout(computeVisible, 120)
    }

    vp.addEventListener('wheel', handleWheel, { passive: false })
    return () => vp.removeEventListener('wheel', handleWheel)
  }, [computeVisible])

  const zoomBy = (factor: number) => {
    const vp = viewportRef.current
    if (!vp) return
    const vw = vp.clientWidth / 2
    const vh = vp.clientHeight / 2
    const prevScale = view.current.scale
    const nextScale = Math.min(2, Math.max(0.25, prevScale * factor))
    view.current.tx = vw - ((vw - view.current.tx) / prevScale) * nextScale
    view.current.ty = vh - ((vh - view.current.ty) / prevScale) * nextScale
    view.current.scale = nextScale
    applyTransform()
    computeVisible()
  }

  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[32px] border border-dark/10 bg-tan/20 sm:h-[520px] lg:h-[680px]">
      <div
        ref={viewportRef}
        className="absolute inset-0 touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <div
          ref={canvasRef}
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
        >
          {images.map((_, i) => {
            const isVisible = visible.has(i)
            return (
              <button
                key={images[i]}
                onClick={() => {
                  if (!drag.current.moved) onSelect(i)
                }}
                className={`stitch-card group absolute cursor-pointer overflow-hidden rounded-[20px] bg-transparent p-[12px] ${ROTATIONS[i % ROTATIONS.length]}`}
                style={{ left: positions[i].x, top: positions[i].y, width: CARD_SIZE - 40 }}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-[13px] bg-tan/50">
                  {isVisible && (
                    <img
                      src={stageImages[i]}
                      loading="lazy"
                      decoding="async"
                      alt={`Foto del proyecto ${i + 1}`}
                      className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      draggable={false}
                    />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-10 flex gap-2">
        <button
          onClick={() => zoomBy(0.8)}
          aria-label="Alejar"
          className="rounded-full bg-dark/80 p-2.5 text-background shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={() => zoomBy(1.25)}
          aria-label="Acercar"
          className="rounded-full bg-dark/80 p-2.5 text-background shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={fitToView}
          aria-label="Ver todo"
          className="rounded-full bg-dark/80 p-2.5 text-background shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      <div className="absolute bottom-4 right-4 z-10 rounded-full bg-dark/80 px-3 py-1.5 font-mono text-xs text-background">
        {images.length} fotos · arrastrá / pellizcá para explorar
      </div>
    </div>
  )
}

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = useCallback(() => setSelectedIndex(null), [])
  const prev = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null))
  }, [])
  const next = useCallback(() => {
    setSelectedIndex((i) => (i !== null ? (i + 1) % images.length : null))
  }, [])

  return (
    <section
      id="galeria"
      className="mx-auto max-w-content px-6 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24"
    >
      <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-grotesk text-[32px] uppercase leading-tight text-dark sm:text-[44px] lg:text-[56px]">
          Galería del
          <br />
          proyecto
        </h2>
        <p className="max-w-[320px] font-mono text-sm text-dark/70 sm:text-base">
          Un registro de lo que fuimos armando en Sala Amarilla, paso a paso.
        </p>
      </div>

      <GalleryStage onSelect={setSelectedIndex} />

      {selectedIndex !== null && (
        <Lightbox
          images={images}
          selectedIndex={selectedIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-dark/80 p-3 text-background shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
          aria-label="Volver arriba"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </section>
  )
}
