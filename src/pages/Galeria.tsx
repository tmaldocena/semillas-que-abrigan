import Footer from '../components/Footer'
import Gallery from '../components/Gallery'
import PageHero from '../components/PageHero'

export default function Galeria() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Encabezado visual con fondo de imagen a todo color */}
      <PageHero
        badge="Registro fotográfico · Sala Amarilla"
        title="Galería del Proyecto"
        subtitle="Un recorrido por cada momento: la exploración de semillas, los talleres familiares, los experimentos y la alegría de trabajar juntos."
        imageSrc="/gallery/IMG_20260603_163138870_HDR.webp"
        theme="amber"
      />

      <div className="mx-auto w-full max-w-content flex-1 px-6 sm:px-10 lg:px-14">
        <main className="py-12 sm:py-16">
          <Gallery />
        </main>
      </div>
      <Footer />
    </div>
  )
}
