export default function Footer() {
  return (
    <footer className="rounded-t-[32px] bg-dark px-6 py-14 text-background sm:px-10 lg:px-14">
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 text-center">
        <div className="space-y-1.5">
          <p className="font-grotesk text-lg uppercase tracking-wide text-background sm:text-xl">
            Escuela N° Prov. de San Luis
          </p>
          <p className="font-mono text-sm text-background/70 sm:text-base">
            Jardín Creciendo — Sala Amarilla (5 años) — Turno Tarde
          </p>
          <p className="font-mono text-xs text-background/55 sm:text-sm">
            Docentes: Karina Aguilera y Lorena Vázquez
          </p>
        </div>

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
