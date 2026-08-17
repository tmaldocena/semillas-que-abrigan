import { useState, useEffect, useRef } from 'react'
import { Sparkles, X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

const POSTERS = Array.from({ length: 15 }, (_, i) => `/carteles-ninos/cartel${i + 1}.webp`)

const ROTATIONS = [
  '-rotate-[2.5deg]',
  'rotate-[2deg]',
  '-rotate-[1.8deg]',
  'rotate-[3.2deg]',
  '-rotate-[3deg]',
  'rotate-[1.5deg]',
  '-rotate-[2deg]',
  'rotate-[2.8deg]',
  '-rotate-[1.2deg]',
  'rotate-[3.5deg]',
  '-rotate-[2.2deg]',
  'rotate-[1.8deg]',
  '-rotate-[3.5deg]',
  'rotate-[2.4deg]',
  '-rotate-[1.5deg]',
]

const FLOAT_DELAYS = [
  '0s',
  '0.4s',
  '0.8s',
  '0.2s',
  '0.6s',
  '1s',
  '0.3s',
  '0.7s',
  '0.1s',
  '0.5s',
  '0.9s',
  '0.35s',
  '0.75s',
  '0.25s',
  '0.65s',
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
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!playing) return
    const id = setInterval(onNext, 3000)
    return () => clearInterval(id)
  }, [playing, onNext])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
        aria-label="Cerrar"
      >
        <X size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Anterior"
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Siguiente"
      >
        <ChevronRight size={28} />
      </button>

      <div
        className="relative p-3 bg-white rounded-2xl shadow-2xl max-h-[85vh] max-w-[90vw] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[selectedIndex]}
          alt={`Cartel de los niños ${selectedIndex + 1}`}
          className="max-h-[78vh] max-w-[85vw] rounded-xl object-contain select-none"
        />
      </div>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full bg-white/15 px-5 py-2 font-mono text-sm text-white/90 backdrop-blur-sm">
        <button
          onClick={(e) => {
            e.stopPropagation()
            setPlaying(!playing)
          }}
          className="text-white/80 hover:text-white transition-colors"
          aria-label={playing ? 'Pausar' : 'Reproducir'}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <span>
          Cartel {selectedIndex + 1} de {images.length}
        </span>
      </div>
    </div>
  )
}

export default function KidsPosters() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-content px-6 py-20 sm:px-10 sm:py-28 lg:px-14 lg:py-32"
    >
      {/* Encabezado de la sección */}
      <div className="mb-12 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rust/15 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-rust">
          <Sparkles size={14} />
          Registro gráfico · Sala Amarilla
        </span>
        <h2 className="mt-3 font-grotesk text-[32px] uppercase leading-tight text-dark sm:text-[44px] lg:text-[56px]">
          Nuestros científicos escriben
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] font-mono text-sm text-dark/80 sm:text-base">
          Carteles, palabras y registros realizados por las infancias durante la exploración de semillas y hierbas aromáticas.
        </p>
      </div>

      {/* Pizarra de corcho / tablero estilo sticker pegado */}
      <div className="stitch-card relative rounded-[36px] bg-tan/30 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-inner">
        {/* Grilla de stickers */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {POSTERS.map((src, index) => {
            const rot = ROTATIONS[index % ROTATIONS.length]
            const floatDelay = FLOAT_DELAYS[index % FLOAT_DELAYS.length]

            return (
              <div
                key={src}
                onClick={() => setSelectedIndex(index)}
                style={{
                  animationDelay: `${index * 80}ms`,
                }}
                className={`group relative cursor-pointer transition-all duration-500 transform ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-12 opacity-0'
                }`}
              >
                {/* Contenedor tipo Sticker */}
                <div
                  className={`sticker-card relative rounded-[16px] bg-white p-2.5 sm:p-3 shadow-md shadow-dark/10 transition-all duration-300 ${rot} group-hover:rotate-0 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:z-20 group-hover:scale-105 animate-gentle-float`}
                  style={{ animationDelay: floatDelay }}
                >
                  {/* Cinta transparente adhesiva (Scotch tape) */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 h-4 w-12 rounded-sm bg-amber-100/70 border border-white/60 shadow-sm backdrop-blur-[1px] rotate-[-2deg]" />

                  {/* Imagen del cartel */}
                  <div className="relative overflow-hidden rounded-[10px] bg-tan/20 aspect-[4/3]">
                    <img
                      src={src}
                      loading="lazy"
                      alt={`Cartel de los niños ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
                    />
                  </div>

                  {/* Etiqueta de pie */}
                  <div className="mt-2 text-center">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-dark/60">
                      Registro N° {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Lightbox para ver los carteles en tamaño completo */}
      {selectedIndex !== null && (
        <Lightbox
          images={POSTERS}
          selectedIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onPrev={() =>
            setSelectedIndex((i) =>
              i !== null ? (i - 1 + POSTERS.length) % POSTERS.length : null
            )
          }
          onNext={() =>
            setSelectedIndex((i) =>
              i !== null ? (i + 1) % POSTERS.length : null
            )
          }
        />
      )}
    </section>
  )
}
