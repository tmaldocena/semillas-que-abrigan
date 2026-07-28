import { Mail, Instagram } from 'lucide-react'
import Header from './Header'

const SOCIALS = [
  { icon: Mail, label: 'Escribir por mail', href: 'mailto:contacto@ejemplo.com' },
  { icon: Instagram, label: 'Ver en Instagram', href: '#' },
]

function SocialButton({ icon: Icon, label, href }: (typeof SOCIALS)[number]) {
  return (
    <a
      href={href}
      aria-label={label}
      className="liquid-glass flex h-14 w-14 items-center justify-center rounded-[1rem] text-dark transition-colors hover:bg-dark/5"
    >
      <Icon size={20} strokeWidth={1.75} />
    </a>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[640px] w-full overflow-hidden rounded-b-[32px]">
      {/* Fondo de video — placeholder: reemplazar /public/hero-video.mp4 por el video real */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-video.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="relative z-10 mx-auto flex h-full max-w-content flex-col px-6 sm:px-10 lg:px-14">
        <Header />


        {/* Título abajo-izquierda / botón abajo-derecha, directo sobre el video.
            El halo de texto reemplaza al panel: da contraste sin tapar la escena. */}
        <div className="flex flex-1 flex-col items-center justify-end gap-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pb-12 lg:pb-16">
          <div className="animate-fade-up max-w-[320px] text-center sm:max-w-[420px] sm:text-left lg:max-w-[520px]">
            <h1 className="font-grotesk text-[30px] uppercase leading-[1.1] text-dark [text-shadow:0_2px_18px_rgba(247,223,188,0.9),0_1px_4px_rgba(247,223,188,0.95)] sm:text-[38px] md:text-[46px] lg:text-[56px]">
              Semillas que
              <br />
              abrigan, bolsitas
              <br />
              que abrazan
            </h1>
            <p className="mx-auto mt-3 max-w-[280px] font-mono font-bold text-[18px] text-dark/85 sm:mx-0 sm:max-w-none sm:text-[15px]">
              Cada semilla, guardada con cariño en su bolsita.
            </p>
          </div>

          <a
            href="#galeria"
            className="animate-fade-up inline-flex shrink-0 items-center rounded-full bg-rust px-7 py-3 font-mono text-sm font-semibold uppercase tracking-wide text-background shadow-lg shadow-dark/10 transition-colors hover:bg-sage"
          >
            Ver la galería
          </a>
        </div>

        {/* Íconos sociales — mobile, centrados debajo */}
        <div className="flex justify-center gap-3 pb-8 lg:hidden">
          {SOCIALS.map((s) => (
            <SocialButton key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
