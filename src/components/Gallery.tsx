import { useState, useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react'

const imageModules = import.meta.glob('../../public/gallery/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const images: string[] = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url as string)

const ROTATIONS = [
  '-rotate-[1.2deg]',
  'rotate-[0.8deg]',
  'rotate-[1.4deg]',
  '-rotate-[0.6deg]',
  'rotate-[0.5deg]',
  '-rotate-[1deg]',
]

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

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1.5 font-mono text-sm text-white/70">
        {selectedIndex + 1} / {images.length}
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
    setSelectedIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null,
    )
  }, [])
  const next = useCallback(() => {
    setSelectedIndex((i) =>
      i !== null ? (i + 1) % images.length : null,
    )
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

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setSelectedIndex(i)}
            className={`stitch-card group relative overflow-hidden rounded-[24px] p-[18px] bg-transparent cursor-pointer ${ROTATIONS[i % ROTATIONS.length]}`}
          >
            <div className="relative overflow-hidden rounded-[16px] bg-tan/50">
              <img
                src={src}
                loading="lazy"
                alt={`Foto del proyecto ${i + 1}`}
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

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
