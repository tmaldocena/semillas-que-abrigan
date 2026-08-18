import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import KidsPosters from '../components/KidsPosters'
import { ArrowRight } from 'lucide-react'

// Carga dinámica de imágenes para el preview
const imageModules = import.meta.glob('../../public/gallery/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const continuacionImageModules = import.meta.glob('../../public/continue-gallery/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

const previewImages: string[] = Object.entries(imageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url as string)
  .slice(0, 3) // Solo 3 imágenes para el preview

const continuacionImages: string[] = Object.entries(continuacionImageModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, url]) => url as string)
  .slice(0, 3)

const ROTATIONS = ['-rotate-[1.2deg]', 'rotate-[0.8deg]', 'rotate-[1.4deg]']

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 3.1 Hero */}
      <Hero />

      {/* 3.2 La pregunta (teaser) */}
      <section className="relative mx-auto w-full max-w-content px-6 py-20 sm:px-10 sm:py-28 lg:px-14 lg:py-36 overflow-visible">
        <div className="relative mx-auto max-w-[840px]">
          {/* Personaje asomándose desde el margen izquierdo */}
          <img
            src="/waving.svg"
            alt="Personaje saludando"
            className="absolute -left-8 sm:-left-16 lg:-left-24 top-1/2 -translate-y-1/2 z-20 w-24 sm:w-40 lg:w-52 h-auto rotate-[15deg] transition-transform duration-300 hover:rotate-[6deg] hover:scale-105 select-none drop-shadow-md"
          />

          <div className="stitch-card relative z-10 rounded-[36px] p-4 sm:p-6">
            <div className="rounded-[28px] bg-tan/30 px-6 py-12 text-center sm:px-12 sm:py-16 lg:px-16 lg:py-20">
              <span className="mb-4 inline-block font-mono text-xs font-semibold uppercase tracking-widest text-rust">
                Feria de Ciencias 2026 · Sala Amarilla
              </span>
              <h2 className="font-grotesk text-[24px] uppercase leading-tight text-dark sm:text-[36px] lg:text-[44px]">
                Con la llegada del frío, en la sala nos preguntamos:
                <br />
                <span className="text-rust">
                  ¿cómo podemos abrigarnos sin los riesgos del agua caliente?
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-[540px] font-mono text-base leading-relaxed text-dark/80 sm:text-lg">
                Así nació una bolsita térmica hecha con semillas, hierbas aromáticas y mucho cariño.
              </p>

              <div className="mt-10">
                <Link
                  to="/proceso"
                  className="inline-flex items-center gap-3 rounded-full bg-rust px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-lg shadow-dark/10 transition-colors hover:bg-sage"
                >
                  Conocé el proceso
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Nuestros científicos escriben */}
      <KidsPosters />

      {/* 3.3 Preview de galería */}
      <section className="mx-auto w-full max-w-content px-6 pb-20 sm:px-10 sm:pb-28 lg:px-14 lg:pb-36">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-rust">
              Galería
            </span>
            <h2 className="font-grotesk text-[32px] uppercase leading-tight text-dark sm:text-[44px] lg:text-[52px]">
              Un poco de lo que hicimos
            </h2>
          </div>
          <Link
            to="/galeria"
            className="inline-flex shrink-0 items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide text-rust transition-colors hover:text-sage"
          >
            Ver galería completa
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {previewImages.map((src, i) => (
            <Link
              key={src}
              to="/galeria"
              className={`stitch-card group relative overflow-hidden rounded-[24px] p-[18px] bg-transparent cursor-pointer ${ROTATIONS[i % ROTATIONS.length]}`}
            >
              <div className="relative overflow-hidden rounded-[16px] bg-tan/50">
                <img
                  src={src}
                  loading="lazy"
                  alt={`Foto destacada ${i + 1}`}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link
            to="/galeria"
            className="inline-flex items-center gap-2 rounded-full bg-rust px-7 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-md transition-colors hover:bg-sage"
          >
            Ver galería completa
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/*continuacion */}
      <section className="mx-auto w-full max-w-content px-6 pb-20 sm:px-10 sm:pb-28 lg:px-14 lg:pb-36">
        <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-rust">
              Continuación
            </span>
            <h2 className="font-grotesk text-[32px] uppercase leading-tight text-dark sm:text-[44px] lg:text-[52px]">
              Un poco de lo que hicimos después!
            </h2>
          </div>
          <Link
            to="/continuacion"
            className="inline-flex shrink-0 items-center gap-2 font-mono text-sm font-semibold uppercase tracking-wide text-rust transition-colors hover:text-sage"
          >
            Ver galería completa
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {continuacionImages.map((src, i) => (
            <Link
              key={src}
              to="/continuacion"
              className={`stitch-card group relative overflow-hidden rounded-[24px] p-[18px] bg-transparent cursor-pointer ${ROTATIONS[i % ROTATIONS.length]}`}
            >
              <div className="relative overflow-hidden rounded-[16px] bg-tan/50">
                <img
                  src={src}
                  loading="lazy"
                  alt={`Foto destacada ${i + 1}`}
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center sm:hidden">
          <Link
            to="/continuacion"
            className="inline-flex items-center gap-2 rounded-full bg-rust px-7 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-md transition-colors hover:bg-sage"
          >
            Ver galería completa
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
