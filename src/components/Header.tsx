import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Inicio', to: '/' },
  { label: 'Galería', to: '/#galeria' },
  { label: 'Encuesta', to: '/encuesta', highlight: true },
]

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8 lg:px-14 lg:pt-10">
      <Link to="/" aria-label="Semillas que abrigan — Inicio">
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
    </header>
  )
}
