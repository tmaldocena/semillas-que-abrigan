# Semillas que abrigan, bolsitas que abrazan — Estructura del sitio (v2, multi-página)

Escuela N° 70 Provincia de San Luis — Jardín Creciendo Juntos
Sala de 5 años — Turno Tarde · Feria de Ciencias 2026

---

## 1. Arquitectura de páginas

```
/            Inicio
/proceso     El proceso (incluye "El objeto tecnológico")
/resultados  Resultados (incluye "Proyección futura")
/galeria     Galería
```

Layout compartido en las 4 páginas: **Header** (logo + nav) y **Footer** (datos institucionales + agradecimientos + crédito).

### Nav
`Inicio · Proceso · Resultados · Galería`

### Dependencia nueva
`react-router-dom` — es la única librería que se suma al proyecto para manejar las 4 rutas.

Estructura de carpetas sugerida:
```
src/
  pages/
    Home.tsx
    Proceso.tsx
    Resultados.tsx
    Galeria.tsx
  components/
    Header.tsx
    Footer.tsx
    Hero.tsx
    ...
  App.tsx        → define <BrowserRouter> y <Routes>
```

---

## 2. Sistema de diseño (sin cambios, se reutiliza tal cual)

**Colores**
- `background` `#F7DFBC` — fondo general
- `dark` `#232024` — texto principal / footer
- `rust` `#8B4A1D` — acento primario (CTAs, subrayados)
- `sage` `#4E7856` — acento secundario (tags, hover)
- `tan` `#DFA97C` — tono intermedio

**Tipografías**
- Mouldy Cheese (`font-grotesk`) — títulos y display
- Quicksand (`font-mono`) — cuerpo de texto

**Elementos de firma reutilizables**
- `.liquid-glass` — nav, íconos sociales, tags de la galería
- `.stitch-card` — borde punteado con leve inclinación a mano (cards de galería). **Se puede reutilizar en las cards de "El proceso" y en las tablas colapsables de "Resultados"** para mantener consistencia visual entre páginas.

---

## 3. Página `/` — Inicio

### 3.1 Hero
*(sin cambios respecto a la versión actual — video + título + CTA)*

- H1: `Semillas que abrigan, bolsitas que abrazan`
- Bajada: `Cada semilla, guardada con cariño en su bolsita.`
- CTA: `Ver la galería` (o considerar cambiar el destino a `/proceso` ahora que existe esa página — a definir)

### 3.2 La pregunta (teaser)

Sección corta, tipográfica, sin ruido visual — la pregunta como protagonista.

> **Con la llegada del frío, en la sala nos preguntamos:**
> **¿cómo podemos abrigarnos sin los riesgos del agua caliente?**

Bajada:
> Así nació una bolsita térmica hecha con semillas, hierbas aromáticas y mucho cariño.

CTA: `Conocé el proceso` → `/proceso`

### 3.3 Preview de galería

Muestra solo 2-3 fotos (no las 6), a modo de adelanto.

Título: `Un poco de lo que hicimos`
CTA: `Ver galería completa` → `/galeria`

---

## 4. Página `/proceso` — El proceso

### 4.1 Encabezado

- H1: `El proceso`
- Subtítulo institucional: `Sala Amarilla (5 años) · Escuela N° 70 · Jardín Creciendo Juntos`
- Intro:
  > Todo empezó con una pregunta de los chicos, cuando llegaron los días de frío: ¿cómo podemos cuidarnos sin los riesgos del agua caliente? Buscamos la respuesta explorando, tocando, oliendo y probando — como corresponde a la ciencia en Sala Amarilla.

### 4.2 Timeline — 7 etapas

Horizontal en desktop, vertical en mobile. Numerar del 1 al 7 con el detalle de costura como conector entre etapas.

| # | Etapa | Copy corto |
|---|-------|------------|
| 1 | Indagación y problematización | Conversamos sobre el frío, el calor y qué cosas nos hacen sentir bien. |
| 2 | Exploración y recolección | Salimos a buscar semillas al patio: la "caza de semillas" nos llevó hasta el espinillo de la escuela. |
| 3 | Clasificación y registro | Observamos, tocamos y clasificamos las semillas por tamaño y textura. Armamos un herbario mural. |
| 4 | Exploración sensorial y emocional | Con los ojos vendados, descubrimos aromas de lavanda, romero y menta — y las emociones que despiertan. |
| 5 | Experimentación científica | Probamos qué semillas conservan mejor el calor, usando el calefactor de la sala. |
| 6 | Diseño y producción tecnológica | Diseñamos y armamos las bolsitas junto a nuestras familias, en un taller escolar. |
| 7 | Comunicación y socialización | Compartimos la "Receta mágica" con la comunidad, en folletos y en la Feria de Ciencias. |

### 4.3 El objeto tecnológico

Sección tipo "producto" — imagen/ilustración de la bolsita + texto.

- Kicker: `El objeto tecnológico`
- H2: `Bolsitas que abrigan y abrazan`
- Descripción:
  > Una bolsita térmica natural y aromática, hecha con tela de algodón, semillas y hierbas aromáticas. Nació para reemplazar el agua caliente por algo igual de efectivo, pero seguro.

Cómo funciona (3 puntos, con íconos):
1. Se calienta en el microondas durante 1 minuto.
2. Las semillas conservan el calor y las hierbas liberan su aroma.
3. El calor intensifica el aroma — ese fue nuestro **"puente científico"**.

Seguridad:
> Materiales naturales, reutilizables y biodegradables. Sin riesgo de quemaduras ni derrames.

---

## 5. Página `/resultados` — Resultados

### 5.1 Encabezado

- H1: `Resultados`
- Intro:
  > ¿Cuáles semillas conservan mejor el calor? ¿Qué aromas nos hacen sentir mejor? Estas son las respuestas que encontramos.

### 5.2 Conclusiones destacadas (cards, visibles por defecto)

**Card 1**
- Título: `El espinillo fue la semilla más eficiente`
- Texto: Mantiene el calor entre 25 y 30 minutos, sin quemarse ni desprender olor.

**Card 2**
- Título: `La lavanda genera más calma`
- Texto: Su aroma suave y persistente es ideal para bolsitas nocturnas.

### 5.3 Tablas completas (colapsable / acordeón — "Ver tabla completa")

Por defecto cerradas; se despliegan con un botón. Usar `.stitch-card` como contenedor del acordeón para mantener la identidad visual.

**Tabla 1 — Capacidad térmica de las semillas**

| Semilla | Tiempo de conservación | Observaciones | Conclusión |
|---|---|---|---|
| Espinillo | 25-30 min | Mantiene temperatura estable, no se quema ni desprende olor | Más eficiente y segura |
| Trigo | 20-25 min | Conserva calor moderado, textura agradable | Buena alternativa |
| Arroz | 15-20 min | Se enfría más rápido, pero es liviano y fácil de manipular | Complementaria |

**Tabla 2 — Aromáticas**

| Planta | Aroma al calentarse | Sensación emocional | Observaciones |
|---|---|---|---|
| Lavanda | Suave y persistente | Calma, relajación | Ideal para bolsitas nocturnas |
| Romero | Intenso y fresco | Energía, vitalidad | Aporta sensación de bienestar |
| Menta | Refrescante | Alegría, alivio | Complementa el efecto térmico |

### 5.4 Proyección futura

- H2: `¿Y ahora qué sigue?`

**CAPS Hospital del Norte**
> El 18 de agosto llevamos el proyecto al CAPS Hospital del Norte, para compartir la "Receta mágica" con adultos mayores.

**Banco de semillas 2027**
> Estamos armando un Banco de Semillas en la escuela, para conservar especies autóctonas de San Luis y seguir haciendo bolsitas cada invierno.

**Agradecimiento breve**
> Gracias a las familias que sumaron hierbas, tiempo y cariño. Y a toda la comunidad de la Escuela N° 70 que hizo posible este proyecto.

---

## 6. Página `/galeria` — Galería

*(reutiliza el componente `Gallery.tsx` que ya existe, sin cambios de estructura)*

- H1: `Galería`
- Subtítulo: `Un registro de lo que fuimos armando en Sala Amarilla, paso a paso.`
- Grid de 6 cards con borde de costura (ya implementado)

---

## 7. Footer (sin cambios, en las 4 páginas)

```
Escuela N° Prov. de San Luis
Jardín Creciendo — Sala Amarilla (5 años) — Turno Tarde
Docentes: Karina Aguilera y Lorena Vázquez

Hecho con ✨ por Maguito Studio
```

---

## 8. Pendientes / contenido que falta para cerrar

- [ ] Video real del Hero (`hero-video.mp4`)
- [ ] Fotos reales para reemplazar los 6 placeholders de la galería
- [ ] Definir si el CTA del Hero apunta a `/galeria` o a `/proceso`
- [ ] Confirmar si se agrega botón de descarga del Informe Pedagógico completo en PDF (no estaba definido — se descartó como página propia, pero podría ser un link en Resultados o en el Footer)
- [ ] Ilustración/foto para la sección "El objeto tecnológico" (bolsita térmica)
- [ ] Revisar si "Sobre el proyecto" (mencionado en el nav de la v1) queda cubierto por `/proceso` o si hace falta contenido institucional aparte (marco teórico Piaget/Vygotsky no está contemplado en esta estructura — se consideró demasiado técnico para el sitio público)
