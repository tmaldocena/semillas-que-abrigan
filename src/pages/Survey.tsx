import { ArrowUpRight } from 'lucide-react'
import Footer from '../components/Footer'
import PageHero from '../components/PageHero'
import SurveyLiveStats from '../components/SurveyLiveStats'

const FORM_URL = 'https://forms.gle/sXk9ZeBxRyJimUPDA'

export default function Survey() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Encabezado visual con fondo de imagen a todo color */}
      <PageHero
        badge="Comunidad y Familias · Sala Amarilla"
        title="Encuesta de Opinión"
        subtitle="Queremos saber cómo viviste el proyecto de las bolsitas con semillas. Tu opinión nos ayuda a seguir sembrando y mejorando cada detalle."
        imageSrc="/gallery/IMG_20260521_145508281_HDR.webp"
        theme="rust"
      >
        <a
          href={FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full bg-rust px-9 py-4 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-lg backdrop-blur-md transition-all hover:bg-sage hover:scale-105"
        >
          Abrir Google Form
          <ArrowUpRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </PageHero>

      <div className="mx-auto flex w-full max-w-content flex-1 flex-col px-6 sm:px-10 lg:px-14">
        <main className="py-12 sm:py-16">
          <SurveyLiveStats />
        </main>
      </div>

      <Footer />
    </div>
  )
}
