import React from 'react'
import Header from './Header'

interface PageHeroProps {
  badge: string
  title: string
  subtitle: string
  imageSrc: string
  theme?: 'rust' | 'sage' | 'amber' | 'dark'
  children?: React.ReactNode
}

const THEME_STYLES = {
  rust: {
    overlay: 'bg-gradient-to-t from-[#232024] via-[#232024]/50 to-transparent',
    badge: 'bg-rust/60 text-background border-rust/80',
  },
  sage: {
    overlay: 'bg-gradient-to-t from-[#232024] via-[#232024]/50 to-transparent',
    badge: 'bg-sage/60 text-background border-sage/80',
  },
  amber: {
    overlay: 'bg-gradient-to-t from-[#232024] via-[#232024]/50 to-transparent',
    badge: 'bg-amber-800/60 text-background border-amber-600/80',
  },
  dark: {
    overlay: 'bg-gradient-to-t from-[#232024] via-[#232024]/50 to-transparent',
    badge: 'bg-dark/60 text-background border-dark/80',
  },
}

export default function PageHero({
  badge,
  title,
  subtitle,
  imageSrc,
  theme = 'rust',
  children,
}: PageHeroProps) {
  const currentTheme = THEME_STYLES[theme] || THEME_STYLES.rust

  return (
    <section className="relative w-full overflow-hidden rounded-b-[36px] bg-dark text-background min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex flex-col justify-between shadow-xl">
      {/* Imagen de fondo NÍTIDA a todo color */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover object-center scale-105 transition-transform duration-1000 hover:scale-100"
      />
      {/* Overlay gradiente suave desde abajo para legibilidad perfecta del título */}
      <div className={`absolute inset-0 ${currentTheme.overlay}`} />

      {/* Header flotante sobre la imagen */}
      <div className="relative z-20 mx-auto w-full max-w-content">
        <Header />
      </div>

      {/* Contenido del Encabezado */}
      <div className="relative z-10 mx-auto w-full max-w-content px-5 py-8 sm:px-10 sm:py-16 lg:px-14 lg:py-20 text-center flex flex-col items-center">
        <span className={`inline-block rounded-full px-3.5 py-1 sm:px-4 sm:py-1.5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest backdrop-blur-md border mb-3 sm:mb-4 shadow-sm ${currentTheme.badge}`}>
          {badge}
        </span>

        <h1 className="font-grotesk text-[28px] uppercase leading-none text-background sm:text-[52px] lg:text-[68px] max-w-[860px] drop-shadow-lg">
          {title}
        </h1>

        <p className="mt-3 sm:mt-4 max-w-[620px] font-mono text-xs sm:text-base lg:text-lg leading-relaxed text-background/95 [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
          {subtitle}
        </p>

        {children && <div className="mt-6 sm:mt-8 w-full flex justify-center">{children}</div>}
      </div>
    </section>
  )
}
