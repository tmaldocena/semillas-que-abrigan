import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="rounded-t-[32px] bg-dark px-6 py-14 text-background sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 text-center">
        <div className="space-y-1.5">
          <p className="font-grotesk text-lg uppercase tracking-wide text-background sm:text-xl">
            Escuela N°70 Prov. de San Luis
          </p>
          <p className="font-mono text-sm text-background/70 sm:text-base">
            Jardín Creciendo — Sala Amarilla (5 años) — Turno Tarde
          </p>
          <p className="font-mono text-xs text-background/55 sm:text-sm">
            Docentes: Karina Aguilera y Lorena Vázquez
          </p>
        </div>

        {/* Enlaces de navegación rápida */}
        <nav className="my-2">
          <ul className="flex flex-wrap items-center justify-center gap-6 font-grotesk text-xs uppercase tracking-wider text-background/70">
            <li>
              <Link to="/" className="transition-colors hover:text-rust">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/proceso" className="transition-colors hover:text-rust">
                Proceso
              </Link>
            </li>
            <li>
              <Link to="/resultados" className="transition-colors hover:text-rust">
                Resultados
              </Link>
            </li>
            <li>
              <Link to="/galeria" className="transition-colors hover:text-rust">
                Galería
              </Link>
            </li>
            <li>
              <Link
                to="/encuesta"
                className="rounded-full bg-rust/30 px-3.5 py-1 text-background font-semibold transition-colors hover:bg-rust"
              >
                Encuesta
              </Link>
            </li>
          </ul>
        </nav>

        <div className="h-px w-24 bg-rust/40" aria-hidden="true" />

        <p className="font-mono text-xs text-background/50">
          Hecho con <span aria-hidden="true">✨</span> por{' '}
          <a
            href="https://maguitostudio.com.ar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-background/70 underline decoration-rust/50 underline-offset-4 transition-colors hover:text-rust"
          >
            Maguito Studio
          </a>
        </p>
      </div>
    </footer>
  )
}
