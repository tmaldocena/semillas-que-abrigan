import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import { Link } from 'react-router-dom'
import {
  Flame,
  Wind,
  Zap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const TIMELINE_STEPS = [
  {
    number: '01',
    title: 'Indagación y problematización',
    desc: 'Conversamos sobre el frío, el calor y qué cosas nos hacen sentir bien.',
  },
  {
    number: '02',
    title: 'Exploración y recolección',
    desc: 'Salimos a buscar semillas al patio: la "caza de semillas" nos llevó hasta el espinillo de la escuela.',
  },
  {
    number: '03',
    title: 'Clasificación y registro',
    desc: 'Observamos, tocamos y clasificamos las semillas por tamaño y textura. Armamos un herbario mural.',
  },
  {
    number: '04',
    title: 'Exploración sensorial y emocional',
    desc: 'Con los ojos vendados, descubrimos aromas de lavanda, romero y menta — y las emociones que despiertan.',
  },
  {
    number: '05',
    title: 'Experimentación científica',
    desc: 'Probamos qué semillas conservan mejor el calor, usando el calefactor de la sala.',
  },
  {
    number: '06',
    title: 'Diseño y producción tecnológica',
    desc: 'Diseñamos y armamos las bolsitas junto a nuestras familias, en un taller escolar.',
  },
  {
    number: '07',
    title: 'Comunicación y socialización',
    desc: 'Compartimos la "Receta mágica" con la comunidad, en folletos y en la Feria de Ciencias.',
  },
]

export default function Proceso() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Encabezado visual con fondo de imagen a todo color */}
      <PageHero
        badge="Sala Amarilla (5 años) · Escuela N° 70"
        title="El Proceso"
        subtitle="Todo empezó con una pregunta de los chicos: ¿cómo podemos cuidarnos del frío sin los riesgos del agua caliente? Buscamos la respuesta explorando, tocando y oliendo — como corresponde a la ciencia."
        imageSrc="/gallery/IMG_20260526_150459871.webp"
        theme="rust"
      />

      <div className="mx-auto w-full max-w-content px-6 sm:px-10 lg:px-14">
        <main className="py-12 sm:py-16 lg:py-20">

          {/* 4.2 Timeline — 7 etapas */}
          <section className="mt-16 sm:mt-24 lg:mt-32">
            <div className="mb-12 text-center">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-rust">
                Paso a paso
              </span>
              <h2 className="font-grotesk text-[28px] uppercase leading-tight text-dark sm:text-[40px] lg:text-[48px]">
                Las 7 etapas del proyecto
              </h2>
            </div>

            {/* Grid de etapas con estilo de costura */}
            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {TIMELINE_STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="stitch-card relative flex flex-col justify-between rounded-[28px] p-6 bg-tan/20 transition-all hover:bg-tan/35"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-rust font-mono text-sm font-bold text-background">
                        {step.number}
                      </span>
                      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-dark/50">
                        Etapa {index + 1}
                      </span>
                    </div>

                    <h3 className="mt-5 font-grotesk text-xl uppercase leading-snug text-dark">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-dark/80">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-dark/10 flex items-center gap-2 text-rust">
                    <Sparkles size={16} />
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider">
                      Sala Amarilla
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4.3 El objeto tecnológico */}
          <section className="mt-20 sm:mt-28 lg:mt-36">
            <div className="stitch-card rounded-[36px] p-4 sm:p-8">
              <div className="rounded-[28px] bg-tan/40 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
                <div className="max-w-[720px]">
                  <span className="inline-block rounded-full bg-rust/15 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-rust">
                    El objeto tecnológico
                  </span>
                  <h2 className="mt-4 font-grotesk text-[32px] uppercase leading-tight text-dark sm:text-[44px] lg:text-[52px]">
                    Bolsitas que abrigan y abrazan
                  </h2>
                  <p className="mt-4 font-mono text-base leading-relaxed text-dark/85 sm:text-lg">
                    Una bolsita térmica natural y aromática, hecha con tela de algodón, semillas y hierbas aromáticas. Nació para reemplazar el agua caliente por algo igual de efectivo, pero seguro.
                  </p>
                </div>

                {/* Cómo funciona - 3 puntos */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="liquid-glass rounded-[24px] p-6 sm:p-7 flex flex-col items-start">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rust text-background shadow-md">
                      <Flame size={24} />
                    </div>
                    <span className="block font-mono text-xs font-bold uppercase tracking-wider text-rust mb-1.5">
                      Paso 1
                    </span>
                    <h3 className="font-grotesk text-lg uppercase text-dark">
                      Calentar en microondas
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-dark/80">
                      Se calienta en el microondas durante solo 1 minuto.
                    </p>
                  </div>

                  <div className="liquid-glass rounded-[24px] p-6 sm:p-7 flex flex-col items-start">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-background shadow-md">
                      <Wind size={24} />
                    </div>
                    <span className="block font-mono text-xs font-bold uppercase tracking-wider text-sage mb-1.5">
                      Paso 2
                    </span>
                    <h3 className="font-grotesk text-lg uppercase text-dark">
                      Calor y Aroma
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-dark/80">
                      Las semillas conservan el calor y las hierbas liberan suavemente su aroma.
                    </p>
                  </div>

                  <div className="liquid-glass rounded-[24px] p-6 sm:p-7 flex flex-col items-start">
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rust text-background shadow-md">
                      <Zap size={24} />
                    </div>
                    <span className="block font-mono text-xs font-bold uppercase tracking-wider text-rust mb-1.5">
                      Paso 3
                    </span>
                    <h3 className="font-grotesk text-lg uppercase text-dark">
                      Puente Científico
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-dark/80">
                      El calor intensifica el aroma — ese fue nuestro gran descubrimiento.
                    </p>
                  </div>
                </div>

                {/* Banner de seguridad */}
                <div className="mt-10 flex flex-col items-start gap-4 rounded-[24px] border-2 border-sage/40 bg-sage/10 p-6 sm:flex-row sm:items-center">
                  <div className="inline-flex shrink-0 items-center justify-center rounded-full bg-sage p-3 text-background">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h4 className="font-grotesk text-base uppercase text-dark">
                      Seguridad y Sustentabilidad
                    </h4>
                    <p className="font-mono text-sm text-dark/80">
                      Materiales naturales, reutilizables y biodegradables. Sin riesgo de quemaduras ni derrames.
                    </p>
                  </div>
                </div>

                {/* Siguiente paso */}
                <div className="mt-12 text-center sm:text-right">
                  <Link
                    to="/resultados"
                    className="inline-flex items-center gap-3 rounded-full bg-rust px-8 py-4 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-lg transition-colors hover:bg-sage"
                  >
                    Ver los resultados del experimento
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
