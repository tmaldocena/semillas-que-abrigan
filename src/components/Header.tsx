const NAV_LINKS = ['Inicio', 'Galería']

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 pt-6 sm:px-10 sm:pt-8 lg:px-14 lg:pt-10">
      <img src="/icon.svg" alt="Semillas" className="h-8 w-auto lg:h-10" />

      <nav className="liquid-glass hidden rounded-[28px] px-[52px] py-[24px] lg:block">
        <ul className="flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="font-grotesk text-[13px] uppercase tracking-wide text-dark transition-colors hover:text-rust"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Se deja el espacio simétrico para balancear el logo en desktop */}
      <span className="hidden w-[90px] lg:block" aria-hidden="true" />
    </header>
  )
}
