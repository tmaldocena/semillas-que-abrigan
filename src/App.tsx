import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Proceso from './pages/Proceso'
import Resultados from './pages/Resultados'
import Galeria from './pages/Galeria'
import Continuacion from './pages/Continuacion'
import Survey from './pages/Survey'
import ScrollToTop from './components/ScrollToTop'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <div key={location.pathname} className="page-fade-enter min-h-screen bg-background">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/proceso" element={<Proceso />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/continuacion" element={<Continuacion />} />
        <Route path="/encuesta" element={<Survey />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
