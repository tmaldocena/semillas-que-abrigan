import { useState, useEffect, useCallback } from 'react'
import { BarChart3, Users, Heart, Sparkles, RefreshCw, Trees, FileText } from 'lucide-react'
import SurveyModal from './SurveyModal'

interface AromaStat {
  name: string
  count: number
  percent: number
}

interface SurveySummary {
  totalResponses: number
  bienestarPercent: number
  recommendPercent: number
  espinilloKnowledgePercent: number
  aromas: AromaStat[]
  isLive: boolean
  sourceLabel: string
}

function parseCSV(text: string): string[][] {
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

export default function SurveyLiveStats() {
  const [summary, setSummary] = useState<SurveySummary | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const loadCSVData = useCallback(async () => {
    setLoading(true)
    setError(null)

    const csvSource =
      import.meta.env.VITE_SURVEY_SHEET_CSV_URL || '/survey-results.csv'

    try {
      const response = await fetch(csvSource)
      if (!response.ok) throw new Error('No se pudo cargar el archivo de encuestas')

      const csvText = await response.text()
      const rows = parseCSV(csvText)
      const dataRows = rows.slice(1) // excluir fila de encabezados

      const total = dataRows.length
      if (total === 0) throw new Error('Archivo sin respuestas')

      let bienestarCount = 0
      let recommendCount = 0
      let espinilloCount = 0
      const aromaCounts: Record<string, number> = {}

      dataRows.forEach((row) => {
        // Col 10: Sensación de bienestar
        const bien = row[10] || ''
        if (bien.toLowerCase().includes('si') || bien.toLowerCase().includes('sí')) {
          bienestarCount++
        }

        // Col 12 o 18: Recomienda / Volvería a usar
        const volver = row[18] || row[12] || ''
        if (
          volver.toLowerCase().includes('si') ||
          volver.toLowerCase().includes('sí') ||
          volver.toLowerCase().includes('seguramente')
        ) {
          recommendCount++
        }

        // Col 5: Conocimiento del Espinillo
        const esp = row[5] || ''
        if (
          esp.toLowerCase().includes('conozco') ||
          esp.toLowerCase().includes('visto')
        ) {
          espinilloCount++
        }

        // Col 11: Aroma preferido
        let aroma = row[11] || 'Lavanda'
        if (aroma.includes('limón') || aroma.includes('eucalipto')) aroma = 'Limón / Eucalipto'
        aromaCounts[aroma] = (aromaCounts[aroma] || 0) + 1
      })

      const aromasFormatted: AromaStat[] = Object.entries(aromaCounts)
        .map(([name, count]) => ({
          name,
          count,
          percent: Math.round((count / total) * 100),
        }))
        .sort((a, b) => b.count - a.count)

      setSummary({
        totalResponses: total,
        bienestarPercent: Math.round((bienestarCount / total) * 100),
        recommendPercent: Math.round((recommendCount / total) * 100),
        espinilloKnowledgePercent: Math.round((espinilloCount / total) * 100),
        aromas: aromasFormatted,
        isLive: true,
        sourceLabel: csvSource.startsWith('http')
          ? 'Sincronizado desde Google Forms'
          : 'Encuestas reales de la comunidad',
      })
    } catch (err) {
      console.warn('Error al procesar CSV de encuestas:', err)
      setError('Cargando datos locales de la encuesta...')
      // Fallback estático basado en las 29 respuestas del formulario real
      setSummary({
        totalResponses: 29,
        bienestarPercent: 100,
        recommendPercent: 100,
        espinilloKnowledgePercent: 97,
        aromas: [
          { name: 'Lavanda', count: 19, percent: 65 },
          { name: 'Menta', count: 4, percent: 14 },
          { name: 'Manzanilla', count: 4, percent: 14 },
          { name: 'Romero', count: 1, percent: 4 },
          { name: 'Limón / Eucalipto', count: 1, percent: 4 },
        ],
        isLive: false,
        sourceLabel: 'Datos procesados del proyecto (29 encuestados)',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCSVData()
  }, [loadCSVData])

  if (!summary && loading) {
    return (
      <div className="stitch-card rounded-[32px] bg-tan/20 p-8 text-center font-mono text-dark/70">
        <RefreshCw size={24} className="mx-auto mb-2 animate-spin text-rust" />
        Procesando resultados de la encuesta...
      </div>
    )
  }

  if (!summary) return null

  return (
    <>
      <section className="stitch-card overflow-hidden rounded-[32px] bg-tan/20 p-6 sm:p-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-rust/15 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-rust">
                <Sparkles size={14} />
                {summary.sourceLabel}
              </span>
            </div>
            <h3 className="mt-2 font-grotesk text-2xl uppercase leading-tight text-dark sm:text-3xl">
              Resultados de la Encuesta a las Familias
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-rust px-4 py-2 font-mono text-xs font-semibold uppercase text-background transition-colors hover:bg-sage shadow-md"
            >
              <FileText size={15} />
              Ver informe completo
            </button>

            <button
              onClick={loadCSVData}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full bg-dark/10 p-2 font-mono text-xs font-semibold uppercase text-dark transition-colors hover:bg-dark/20"
              title="Actualizar datos"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-2 font-mono text-xs text-rust/80">{error}</p>
        )}

        {/* Tarjetas de métricas principales extraídas del CSV */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="liquid-glass rounded-[24px] p-6 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rust/20 text-rust">
              <Users size={20} />
            </div>
            <span className="font-grotesk text-4xl text-dark">
              {summary.totalResponses}
            </span>
            <p className="mt-1 font-mono text-xs font-semibold uppercase text-dark/70">
              Encuestados totales
            </p>
          </div>

          <div className="liquid-glass rounded-[24px] p-6 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sage/20 text-sage">
              <Heart size={20} />
            </div>
            <span className="font-grotesk text-4xl text-dark">
              {summary.bienestarPercent}%
            </span>
            <p className="mt-1 font-mono text-xs font-semibold uppercase text-dark/70">
              Genera bienestar
            </p>
          </div>

          <div className="liquid-glass rounded-[24px] p-6 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-rust/20 text-rust">
              <BarChart3 size={20} />
            </div>
            <span className="font-grotesk text-4xl text-dark">
              {summary.recommendPercent}%
            </span>
            <p className="mt-1 font-mono text-xs font-semibold uppercase text-dark/70">
              Volvería a usarla
            </p>
          </div>

          <div className="liquid-glass rounded-[24px] p-6 text-center">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sage/20 text-sage">
              <Trees size={20} />
            </div>
            <span className="font-grotesk text-4xl text-dark">
              {summary.espinilloKnowledgePercent}%
            </span>
            <p className="mt-1 font-mono text-xs font-semibold uppercase text-dark/70">
              Conoce el Espinillo (San Luis)
            </p>
          </div>
        </div>

        {/* Gráfico de barras de Aromas preferidos procesados de la encuesta real */}
        <div className="mt-10 rounded-[24px] bg-background/60 p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="font-grotesk text-xl uppercase text-dark">
                Aromas preferidos por la comunidad
              </h4>
              <p className="font-mono text-xs text-dark/70">
                Elección directa de las familias participantes (sobre {summary.totalResponses} respuestas)
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-mono text-xs font-semibold text-rust uppercase underline underline-offset-4 hover:text-sage text-left sm:text-right"
            >
              Ver testimonios y tabla completa →
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {summary.aromas.map((item) => (
              <div
                key={item.name}
                className="liquid-glass rounded-[20px] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-dark">
                    <span className="font-bold uppercase">{item.name}</span>
                    <span className="font-mono font-bold text-rust">
                      {item.count} {item.count === 1 ? 'voto' : 'votos'} ({item.percent}%)
                    </span>
                  </div>
                  <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-tan/40">
                    <div
                      className="h-full rounded-full bg-rust transition-all duration-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal amplio de resultados */}
      <SurveyModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
