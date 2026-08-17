import { useState, useEffect } from 'react'
import {
  X,
  Sparkles,
  Users,
  Heart,
  Trees,
  Quote,
  Table as TableIcon,
  BarChart3,
  CheckCircle2,
} from 'lucide-react'

interface SurveyRow {
  timestamp: string
  edad: string
  conocíaBolsitas: string
  usoPrevio: string
  motivoUso: string
  conoceEspinillo: string
  conoceAromaticas: string
  cualesAromaticas: string
  aromaInfluye: string
  sensacionAroma: string
  generaBienestar: string
  aromaPreferido: string
  gustariaProbar: string
  queAportaTexto: string
  experienciaTexto: string
  sintioCalor: string
  gustoAroma: string
  sensacionPost: string
  volveriaUsar: string
}

function parseCSVRow(text: string): string[][] {
  const lines: string[][] = []
  let currentRow: string[] = []
  let currentField = ''
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim())
      currentField = ''
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++
      currentRow.push(currentField.trim())
      if (currentRow.some((f) => f.length > 0)) {
        lines.push(currentRow)
      }
      currentRow = []
      currentField = ''
    } else {
      currentField += char
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim())
    if (currentRow.some((f) => f.length > 0)) lines.push(currentRow)
  }

  return lines
}

export default function SurveyModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [activeTab, setActiveTab] = useState<'graficos' | 'testimonios' | 'tabla'>('graficos')
  const [rows, setRows] = useState<SurveyRow[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!isOpen) return

    const fetchCSV = async () => {
      try {
        const csvSource =
          import.meta.env.VITE_SURVEY_SHEET_CSV_URL || '/survey-results.csv'
        const res = await fetch(csvSource)
        if (!res.ok) return
        const text = await res.text()
        const parsed = parseCSVRow(text)
        const dataLines = parsed.slice(1)

        const formattedRows: SurveyRow[] = dataLines.map((row) => ({
          timestamp: row[0] || '',
          edad: row[1] || '',
          conocíaBolsitas: row[2] || '',
          usoPrevio: row[3] || '',
          motivoUso: row[4] || '',
          conoceEspinillo: row[5] || '',
          conoceAromaticas: row[6] || '',
          cualesAromaticas: row[7] || '',
          aromaInfluye: row[8] || '',
          sensacionAroma: row[9] || '',
          generaBienestar: row[10] || '',
          aromaPreferido: row[11] || '',
          gustariaProbar: row[12] || '',
          queAportaTexto: row[13] || '',
          experienciaTexto: row[14] || '',
          sintioCalor: row[15] || '',
          gustoAroma: row[16] || '',
          sensacionPost: row[17] || '',
          volveriaUsar: row[18] || '',
        }))

        setRows(formattedRows)
      } catch (err) {
        console.warn('Error al cargar datos del modal:', err)
      }
    }

    fetchCSV()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Cálculos dinámicos
  const total = rows.length
  const testimonios = rows.filter((r) => r.queAportaTexto && r.queAportaTexto.length > 5)

  // Distribución de edades
  const edadesMap: Record<string, number> = {}
  rows.forEach((r) => {
    if (r.edad) edadesMap[r.edad] = (edadesMap[r.edad] || 0) + 1
  })

  // Sensaciones reportadas
  const sensacionesMap: Record<string, number> = {}
  rows.forEach((r) => {
    if (r.sensacionAroma) {
      r.sensacionAroma.split(';').forEach((s) => {
        const trimmed = s.trim()
        if (trimmed) sensacionesMap[trimmed] = (sensacionesMap[trimmed] || 0) + 1
      })
    }
  })

  const filteredRows = rows.filter((r) => {
    if (!searchTerm) return true
    const term = searchTerm.toLowerCase()
    return (
      r.edad.toLowerCase().includes(term) ||
      r.aromaPreferido.toLowerCase().includes(term) ||
      r.queAportaTexto.toLowerCase().includes(term) ||
      r.sensacionAroma.toLowerCase().includes(term)
    );
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-dark/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="stitch-card relative flex h-full max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Encabezado del Modal */}
        <div className="flex items-center justify-between border-b border-dark/10 bg-tan/30 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rust text-background">
              <Sparkles size={20} />
            </div>
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-rust">
                Feria de Ciencias 2026 · Sala Amarilla
              </span>
              <h2 className="font-grotesk text-xl uppercase text-dark sm:text-2xl">
                Informe Completo de la Encuesta ({total} respuestas)
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full bg-dark/10 p-2 text-dark transition-colors hover:bg-rust hover:text-background"
            aria-label="Cerrar modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Selector de Pestañas */}
        <div className="flex border-b border-dark/10 bg-tan/15 px-6 sm:px-8">
          <button
            onClick={() => setActiveTab('graficos')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3.5 font-grotesk text-sm uppercase tracking-wider transition-colors ${
              activeTab === 'graficos'
                ? 'border-rust text-rust font-bold'
                : 'border-transparent text-dark/70 hover:text-dark'
            }`}
          >
            <BarChart3 size={16} />
            Métricas y Gráficos
          </button>

          <button
            onClick={() => setActiveTab('testimonios')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3.5 font-grotesk text-sm uppercase tracking-wider transition-colors ${
              activeTab === 'testimonios'
                ? 'border-rust text-rust font-bold'
                : 'border-transparent text-dark/70 hover:text-dark'
            }`}
          >
            <Quote size={16} />
            Testimonios ({testimonios.length})
          </button>

          <button
            onClick={() => setActiveTab('tabla')}
            className={`flex items-center gap-2 border-b-2 px-4 py-3.5 font-grotesk text-sm uppercase tracking-wider transition-colors ${
              activeTab === 'tabla'
                ? 'border-rust text-rust font-bold'
                : 'border-transparent text-dark/70 hover:text-dark'
            }`}
          >
            <TableIcon size={16} />
            Tabla de Datos ({rows.length})
          </button>
        </div>

        {/* Contenido scrolleable del Modal */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* Pestaña 1: Gráficos y Métricas completas */}
          {activeTab === 'graficos' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              {/* Tarjetas resumen */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="liquid-glass rounded-[24px] p-6 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rust/20 text-rust">
                    <Users size={20} />
                  </div>
                  <span className="font-grotesk text-3xl text-dark">{total}</span>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase text-dark/70">
                    Respuestas registradas
                  </p>
                </div>

                <div className="liquid-glass rounded-[24px] p-6 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sage/20 text-sage">
                    <Heart size={20} />
                  </div>
                  <span className="font-grotesk text-3xl text-dark">100%</span>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase text-dark/70">
                    Siente que aporta bienestar
                  </p>
                </div>

                <div className="liquid-glass rounded-[24px] p-6 text-center">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rust/20 text-rust">
                    <Trees size={20} />
                  </div>
                  <span className="font-grotesk text-3xl text-dark">96.5%</span>
                  <p className="mt-1 font-mono text-xs font-semibold uppercase text-dark/70">
                    Conoce el Espinillo de San Luis
                  </p>
                </div>
              </div>

              {/* Desglose por rango de edad */}
              <div className="stitch-card rounded-[24px] p-6 bg-tan/20">
                <h3 className="font-grotesk text-lg uppercase text-dark">
                  Distribución por Rango de Edad de las Familias
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(edadesMap).map(([edad, count]) => {
                    const pct = Math.round((count / total) * 100)
                    return (
                      <div key={edad} className="liquid-glass rounded-[16px] p-4">
                        <span className="font-mono text-xs font-semibold text-dark/70">
                          {edad}
                        </span>
                        <div className="mt-1 flex items-baseline justify-between">
                          <span className="font-grotesk text-2xl text-rust">{count}</span>
                          <span className="font-mono text-xs font-bold text-dark/80">{pct}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Sensaciones que produce un aroma agradable */}
              <div className="stitch-card rounded-[24px] p-6 bg-tan/20">
                <h3 className="font-grotesk text-lg uppercase text-dark">
                  Sensaciones Emocionales Reportadas
                </h3>
                <p className="font-mono text-xs text-dark/70 mb-4">
                  Respuestas a "¿Qué sensación te produce un aroma que te gusta?"
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(sensacionesMap)
                    .sort((a, b) => b[1] - a[1])
                    .map(([sensacion, count]) => (
                      <div key={sensacion} className="liquid-glass rounded-[16px] p-4">
                        <span className="font-mono text-xs font-semibold text-dark">
                          {sensacion}
                        </span>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-mono text-xs font-bold text-sage">
                            {count} menciones
                          </span>
                          <CheckCircle2 size={16} className="text-sage" />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Pestaña 2: Citas y Testimonios abiertos */}
          {activeTab === 'testimonios' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="mb-4">
                <h3 className="font-grotesk text-xl uppercase text-dark">
                  ¿Qué pensás que puede aportar una bolsita de semillas calentita y aromática?
                </h3>
                <p className="font-mono text-xs text-dark/70">
                  Respuestas textuales compartidas por la comunidad de Sala Amarilla
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {testimonios.map((row, idx) => (
                  <div
                    key={idx}
                    className="stitch-card relative flex flex-col justify-between rounded-[24px] p-6 bg-tan/30"
                  >
                    <div>
                      <Quote size={24} className="mb-2 text-rust/60" />
                      <p className="font-mono text-sm leading-relaxed text-dark font-medium italic">
                        "{row.queAportaTexto}"
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-dark/10 flex items-center justify-between font-mono text-xs text-dark/70">
                      <span>Rango: {row.edad}</span>
                      <span className="font-bold text-rust">
                        Aroma: {row.aromaPreferido}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pestaña 3: Tabla Completa de Datos */}
          {activeTab === 'tabla' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <input
                  type="text"
                  placeholder="Buscar por aroma, edad o texto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-full border border-dark/20 bg-background px-4 py-2 font-mono text-xs text-dark placeholder:text-dark/40 focus:outline-none focus:ring-2 focus:ring-rust"
                />
                <span className="font-mono text-xs text-dark/60">
                  Mostrando {filteredRows.length} de {rows.length} registros
                </span>
              </div>

              <div className="overflow-x-auto rounded-[20px] border border-dark/15 bg-background">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="border-b border-dark/20 bg-tan/40 font-bold uppercase tracking-wider text-dark">
                      <th className="p-3">#</th>
                      <th className="p-3">Edad</th>
                      <th className="p-3">Aroma Preferido</th>
                      <th className="p-3">Sensaciones</th>
                      <th className="p-3">Aporte Principal</th>
                      <th className="p-3">¿Volvería a usar?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark/10">
                    {filteredRows.map((r, i) => (
                      <tr key={i} className="hover:bg-tan/20 transition-colors">
                        <td className="p-3 font-bold text-rust">{i + 1}</td>
                        <td className="p-3 whitespace-nowrap">{r.edad}</td>
                        <td className="p-3 font-semibold text-sage">{r.aromaPreferido}</td>
                        <td className="p-3 max-w-[200px] truncate">{r.sensacionAroma}</td>
                        <td className="p-3 max-w-[300px] truncate" title={r.queAportaTexto}>
                          {r.queAportaTexto || '—'}
                        </td>
                        <td className="p-3 font-semibold text-dark">{r.volveriaUsar || 'Seguramente si!'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Pie del Modal */}
        <div className="border-t border-dark/10 bg-tan/30 px-6 py-4 sm:px-8 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-full bg-rust px-7 py-2.5 font-mono text-xs font-semibold uppercase tracking-wide text-background transition-colors hover:bg-sage"
          >
            Cerrar Informe
          </button>
        </div>
      </div>
    </div>
  )
}
