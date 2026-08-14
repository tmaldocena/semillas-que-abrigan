import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Galería', to: '/#galeria' },
  { label: 'Encuesta', to: '/encuesta', highlight: true },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open])

  return (
    <header className="relative z-20">
      <div className="flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8 lg:px-14 lg:pt-10">
        <Link
          to="/"
          aria-label="Semillas que abrigan — Inicio"
          onClick={() => setOpen(false)}
        >
          <img src="/icon.svg" alt="Semillas" className="h-8 w-auto lg:h-10" />
        </Link>

        <nav className="liquid-glass hidden rounded-[28px] px-[52px] py-[24px] lg:block">
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  className={
                    link.highlight
                      ? 'inline-flex rounded-full bg-rust px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wide text-background shadow-md shadow-dark/10 transition-colors hover:bg-sage'
                      : 'font-grotesk text-[13px] uppercase tracking-wide text-dark transition-colors hover:text-rust'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Se deja el espacio simétrico para balancear el logo en desktop */}
        <span className="hidden w-[90px] lg:block" aria-hidden="true" />

        {/* Menú hamburguesa en mobile/tablet */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="liquid-glass inline-flex h-10 w-10 items-center justify-center rounded-full text-dark lg:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="liquid-glass absolute left-4 right-4 top-full z-30 mt-3 rounded-[24px] p-4 lg:hidden">
          <ul className="flex flex-col items-stretch gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={
                    link.highlight
                      ? 'flex items-center justify-center rounded-full bg-rust px-4 py-3 font-mono text-[13px] font-semibold uppercase tracking-wide text-background transition-colors hover:bg-sage'
                      : 'flex items-center justify-center rounded-full px-4 py-3 font-grotesk text-[14px] uppercase tracking-wide text-dark transition-colors hover:bg-rust/10'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
