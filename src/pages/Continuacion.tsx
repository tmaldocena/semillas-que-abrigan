import Footer from '../components/Footer'
import Gallery from '../components/Gallery-old'
import PageHero from '../components/PageHero'

export default function Continuacion() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            {/* Encabezado visual con fondo de imagen a todo color */}
            <PageHero
                badge="¿Como seguimos?"
                title="Los próximos pasos que hicimos"
                subtitle="Llevamos el proyecto fuera de la escuela, acercando la iniciativa a la comunidad y transformando nuestro entorno."
                imageSrc="/continue-gallery/cover.webp"
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