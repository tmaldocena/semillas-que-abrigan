import { ArrowUpRight } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const FORM_URL = 'https://forms.gle/sXk9ZeBxRyJimUPDA'

export default function Survey() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="mx-auto flex w-full max-w-content flex-1 flex-col px-6 sm:px-10 lg:px-14">
        <Header />

        <main className="flex flex-1 items-center justify-center py-16 sm:py-24">
          <div className="stitch-card w-full max-w-[680px] rounded-[32px] p-[18px]">
            <div className="rounded-[24px] bg-tan/40 px-8 py-12 text-center sm:px-14 sm:py-16">
              <img
                src="/icon.svg"
                alt="Semillas que abrigan"
                className="mx-auto mb-8 h-12 w-auto lg:h-14"
              />

              <h1 className="font-grotesk text-[28px] uppercase leading-[1.1] text-dark sm:text-[40px] lg:text-[48px]">
                Contanos tu
                <br />
                experiencia
              </h1>

              <p className="mx-auto mt-4 max-w-[460px] font-mono text-sm text-dark/80 sm:text-base">
                Queremos saber cómo viviste el proyecto de las bolsitas con
                semillas. Tu opinión nos ayuda a seguir sembrando y mejorando
                cada detalle. Solo te llevará un par de minutos.
              </p>

              <a
                href={FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-rust px-9 py-4 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-lg shadow-dark/10 transition-colors hover:bg-sage"
              >
                Responder la encuesta
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </a>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
