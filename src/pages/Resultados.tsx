import { useState } from 'react'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import SurveyLiveStats from '../components/SurveyLiveStats'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  ChevronUp,
  Award,
  Heart,
  Building2,
  Sprout,
  ArrowRight,
  Download
} from 'lucide-react'

export default function Resultados() {
  const [openTable1, setOpenTable1] = useState(false)
  const [openTable2, setOpenTable2] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Encabezado visual con fondo de imagen a todo color */}
      <PageHero
        badge="Experimentos y conclusiones"
        title="Resultados"
        subtitle="¿Cuáles semillas conservan mejor el calor? ¿Qué aromas nos hacen sentir mejor? Estas son las respuestas que encontramos tras semanas de laboratorio escolar."
        imageSrc="/gallery/IMG_20260601_155742128_HDR.webp"
        theme="sage"
      >
        {/* Botones de Descarga e Impresión del Informe */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/informe-pedagogico-semillas.pdf"
            download="Informe-Pedagogico-Semillas-Que-Abrigan.pdf"
            className="inline-flex items-center gap-2.5 rounded-full bg-rust px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-background shadow-lg backdrop-blur-md transition-all hover:bg-sage hover:scale-105"
          >
            <Download size={18} />
            Descargar Informe Pedagógico (PDF)
          </a>
        </div>
      </PageHero>

      <div className="mx-auto w-full max-w-content px-6 sm:px-10 lg:px-14">
        <main className="py-12 sm:py-16 lg:py-20">

          {/* 5.2 Conclusiones destacadas */}
          <section className="mt-14 sm:mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="stitch-card flex flex-col items-start rounded-[32px] p-8 bg-tan/30">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rust text-background shadow-md">
                  <Award size={26} />
                </div>
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-rust mb-1.5">
                  Conclusión 1 · Semillas
                </span>
                <h2 className="font-grotesk text-2xl uppercase leading-snug text-dark sm:text-3xl">
                  El espinillo fue la semilla más eficiente
                </h2>
                <p className="mt-3 font-mono text-sm leading-relaxed text-dark/85 sm:text-base">
                  Mantiene el calor entre 25 y 30 minutos, sin quemarse ni desprender olor.
                </p>
              </div>

              <div className="stitch-card flex flex-col items-start rounded-[32px] p-8 bg-tan/30">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-background shadow-md">
                  <Heart size={26} />
                </div>
                <span className="block font-mono text-xs font-bold uppercase tracking-wider text-sage mb-1.5">
                  Conclusión 2 · Aromáticas
                </span>
                <h2 className="font-grotesk text-2xl uppercase leading-snug text-dark sm:text-3xl">
                  La lavanda genera más calma
                </h2>
                <p className="mt-3 font-mono text-sm leading-relaxed text-dark/85 sm:text-base">
                  Su aroma suave y persistente es ideal para bolsitas nocturnas.
                </p>
              </div>
            </div>
          </section>

          {/* 5.3 Tablas completas (Acordeones colapsables) */}
          <section className="mt-16 sm:mt-24">
            <div className="mb-8 text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-rust">
                Datos de laboratorio
              </span>
              <h2 className="font-grotesk text-[28px] uppercase leading-tight text-dark sm:text-[40px]">
                Tablas de experimentación
              </h2>
            </div>

            <div className="space-y-6">
              {/* Tabla 1 — Semillas */}
              <div className="stitch-card overflow-hidden rounded-[28px] bg-tan/20">
                <button
                  onClick={() => setOpenTable1(!openTable1)}
                  className="flex w-full items-center justify-between p-6 sm:p-8 text-left transition-colors hover:bg-tan/30"
                  aria-expanded={openTable1}
                >
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-rust">
                      Experimento 1
                    </span>
                    <h3 className="font-grotesk text-xl uppercase text-dark sm:text-2xl">
                      Capacidad térmica de las semillas
                    </h3>
                  </div>
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rust/10 text-rust">
                    {openTable1 ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                  </div>
                </button>

                {openTable1 && (
                  <div className="border-t border-dark/10 p-6 sm:p-8 animate-in fade-in duration-200">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-sm">
                        <thead>
                          <tr className="border-b border-dark/20 text-xs font-bold uppercase tracking-wider text-dark/60">
                            <th className="pb-3 pr-4">Semilla</th>
                            <th className="pb-3 px-4">Tiempo de conservación</th>
                            <th className="pb-3 px-4">Observaciones</th>
                            <th className="pb-3 pl-4">Conclusión</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-dark/10 text-dark/90">
                          <tr>
                            <td className="py-4 pr-4 font-bold text-rust">Espinillo</td>
                            <td className="py-4 px-4">25 - 30 min</td>
                            <td className="py-4 px-4">Mantiene temperatura estable, no se quema ni desprende olor</td>
                            <td className="py-4 pl-4 font-semibold text-sage">Más eficiente y segura</td>
                          </tr>
                          <tr>
                            <td className="py-4 pr-4 font-bold text-dark">Trigo</td>
                            <td className="py-4 px-4">20 - 25 min</td>
                            <td className="py-4 px-4">Conserva calor moderado, textura agradable</td>
                            <td className="py-4 pl-4">Buena alternativa</td>
                          </tr>
                          <tr>
                            <td className="py-4 pr-4 font-bold text-dark">Arroz</td>
                            <td className="py-4 px-4">15 - 20 min</td>
                            <td className="py-4 px-4">Se enfría más rápido, pero es liviano y fácil de manipular</td>
                            <td className="py-4 pl-4">Complementaria</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Tabla 2 — Aromáticas */}
              <div className="stitch-card overflow-hidden rounded-[28px] bg-tan/20">
                <button
                  onClick={() => setOpenTable2(!openTable2)}
                  className="flex w-full items-center justify-between p-6 sm:p-8 text-left transition-colors hover:bg-tan/30"
                  aria-expanded={openTable2}
                >
                  <div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-sage">
                      Experimento 2
                    </span>
                    <h3 className="font-grotesk text-xl uppercase text-dark sm:text-2xl">
                      Efectos de las plantas aromáticas
                    </h3>
                  </div>
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sage/10 text-sage">
                    {openTable2 ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
                  </div>
                </button>

                {openTable2 && (
                  <div className="border-t border-dark/10 p-6 sm:p-8 animate-in fade-in duration-200">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left font-mono text-sm">
                        <thead>
                          <tr className="border-b border-dark/20 text-xs font-bold uppercase tracking-wider text-dark/60">
                            <th className="pb-3 pr-4">Planta</th>
                            <th className="pb-3 px-4">Aroma al calentarse</th>
                            <th className="pb-3 px-4">Sensación emocional</th>
                            <th className="pb-3 pl-4">Observaciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-dark/10 text-dark/90">
                          <tr>
                            <td className="py-4 pr-4 font-bold text-sage">Lavanda</td>
                            <td className="py-4 px-4">Suave y persistente</td>
                            <td className="py-4 px-4 font-semibold text-rust">Calma, relajación</td>
                            <td className="py-4 pl-4">Ideal para bolsitas nocturnas</td>
                          </tr>
                          <tr>
                            <td className="py-4 pr-4 font-bold text-dark">Romero</td>
                            <td className="py-4 px-4">Intenso y fresco</td>
                            <td className="py-4 px-4">Energía, vitalidad</td>
                            <td className="py-4 pl-4">Aporta sensación de bienestar</td>
                          </tr>
                          <tr>
                            <td className="py-4 pr-4 font-bold text-dark">Menta</td>
                            <td className="py-4 px-4">Refrescante</td>
                            <td className="py-4 px-4">Alegría, alivio</td>
                            <td className="py-4 pl-4">Complementa el efecto térmico</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Estadísticas de la Encuesta a las Familias */}
          <section className="mt-16 sm:mt-24">
            <SurveyLiveStats />
          </section>

          {/* 5.4 Proyección futura */}
          <section className="mt-20 sm:mt-28">
            <div className="stitch-card rounded-[36px] p-4 sm:p-8">
              <div className="rounded-[28px] bg-tan/40 px-6 py-12 sm:px-12 sm:py-16">
                <div className="text-center">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-rust">
                    Comunidad y Futuro
                  </span>
                  <h2 className="mt-2 font-grotesk text-[32px] uppercase leading-tight text-dark sm:text-[44px]">
                    ¿Y ahora qué sigue?
                  </h2>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="liquid-glass rounded-[28px] p-8">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-rust px-4 py-1.5 font-mono text-xs font-bold text-background shadow-sm">
                      <Building2 size={16} />
                      CAPS Hospital del Norte
                    </div>
                    <h3 className="font-grotesk text-xl uppercase text-dark">
                      Compartiendo la Receta Mágica
                    </h3>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-dark/85">
                      El 18 de agosto llevamos el proyecto al CAPS Hospital del Norte, para compartir la "Receta mágica" con adultos mayores.
                    </p>
                  </div>

                  <div className="liquid-glass rounded-[28px] p-8">
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-sage px-4 py-1.5 font-mono text-xs font-bold text-background shadow-sm">
                      <Sprout size={16} />
                      Proyecto 2027
                    </div>
                    <h3 className="font-grotesk text-xl uppercase text-dark">
                      Banco de Semillas Escolar
                    </h3>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-dark/85">
                      Estamos armando un Banco de Semillas en la escuela, para conservar especies autóctonas de San Luis y seguir haciendo bolsitas cada invierno.
                    </p>
                  </div>
                </div>

                {/* Agradecimiento breve */}
                <div className="mt-10 rounded-[24px] border-2 border-rust/30 bg-rust/5 p-6 text-center">
                  <p className="font-mono text-sm font-semibold text-rust sm:text-base">
                    Gracias a las familias que sumaron hierbas, tiempo y cariño. Y a toda la comunidad de la Escuela N° 70 que hizo posible este proyecto.
                  </p>
                </div>

                <div className="mt-10 text-center">
                  <Link
                    to="/galeria"
                    className="inline-flex items-center gap-3 rounded-full bg-rust px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-lg transition-colors hover:bg-sage"
                  >
                    Ver la galería de fotos
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
