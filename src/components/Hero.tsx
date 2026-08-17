import { Link } from 'react-router-dom'
import Header from './Header'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative h-[55vh] min-h-[420px] sm:h-screen sm:min-h-[640px] w-full overflow-hidden rounded-b-[32px]">
      {/* Fondo de video — placeholder: reemplazar /public/hero-video.mp4 por el video real */}
      <video
        className="absolute inset-0 h-full w-full object-cover object-[center_30%] sm:object-center"
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-10 mx-auto flex h-full max-w-content flex-col px-6 sm:px-10 lg:px-14">
        <Header />

        {/* Título abajo-izquierda / botón abajo-derecha */}
        <div className="flex flex-1 flex-col items-center justify-end gap-4 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-12 lg:pb-16">
          <div className="animate-fade-up max-w-[320px] text-center sm:max-w-[420px] sm:text-left lg:max-w-[520px]">
            <h1 className="font-grotesk text-[22px] uppercase leading-[1.1] text-dark [text-shadow:0_2px_18px_rgba(247,223,188,0.9),0_1px_4px_rgba(247,223,188,0.95)] sm:text-[38px] md:text-[46px] lg:text-[56px]">
              Semillas que
              <br />
              abrigan, bolsitas
              <br />
              que abrazan
            </h1>
            <p className="mx-auto mt-2 max-w-[200px] font-mono font-bold text-[13px] text-dark/85 sm:mx-0 sm:max-w-none sm:text-[15px]">
              Cada semilla, guardada con cariño en su bolsita.
            </p>
          </div>

          <Link
            to="/proceso"
            className="group animate-fade-up inline-flex shrink-0 items-center gap-2 rounded-full bg-rust px-7 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-lg shadow-dark/10 transition-all hover:bg-sage hover:shadow-xl hover:-translate-y-0.5"
          >
            Conocé el proceso
          </Link>
        </div>

        {/* Indicador de scroll rebote suave */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 opacity-70 transition-opacity hover:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-widest text-dark font-bold">
            Scroll
          </span>
          <ChevronDown size={18} className="animate-soft-bounce text-dark" />
        </div>
      </div>
    </section>
  )
}
