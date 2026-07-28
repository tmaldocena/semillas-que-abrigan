# Semillas que abrigan

Sitio web del proyecto **"Semillas que abrigan, bolsitas que abrazan"** — una iniciativa de la Escuela N° Prov. de San Luis (Jardín Creciendo, Sala Amarilla, 5 años, Turno Tarde) que registra el proceso de creación de bolsitas con semillas elaboradas por docentes, familias y alumnos.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite 5** (bundler y dev server)
- **Tailwind CSS 3.4** (estilos utilitarios)
- **lucide-react** (iconografía)
- Fuentes personalizadas: _Mouldy Cheese_ (display) y _Quicksand_ (cuerpo)

## Funcionalidades

- **Hero a pantalla completa** con video de fondo y animación de entrada
- **Galería de 84 fotos** del proyecto, cargadas en tiempo de compilación con `import.meta.glob` y lazy loading nativo
- **Visor de imágenes (lightbox)** personalizado con navegación por teclado (flechas, Escape) y botones
- **Botón "volver arriba"** fijo en la esquina inferior derecha, aparece al hacer scroll
- **Diseño responsivo** (mobile, tablet, desktop)
- **Estética "costura a mano"**: bordes punteados, ligera inclinación en las tarjetas, efecto _liquid glass_
- **Accesibilidad**: `aria-labels`, `prefers-reduced-motion`, contraste de colores

## Estructura del proyecto

```
├── public/
│   ├── gallery/          # 84 fotos .webp del proyecto
│   ├── fonts/            # Fuente Mouldy Cheese
│   └── hero-video.mp4    # Video del hero
├── src/
│   ├── components/
│   │   ├── Header.tsx    # Navbar con logo y links
│   │   ├── Hero.tsx      # Sección hero con video
│   │   ├── Gallery.tsx   # Galería + lightbox
│   │   └── Footer.tsx    # Créditos e información
│   ├── App.tsx           # Componente raíz
│   ├── main.tsx          # Punto de entrada
│   └── index.css         # Estilos globales (liquid-glass, stitch-card)
├── tailwind.config.js    # Configuración de Tailwind con colores custom
├── vite.config.ts
└── package.json
```

## Paleta de colores

| Color       | Hex       | Uso                        |
|-------------|-----------|----------------------------|
| `background`| `#F7DFBC` | Fondo cálido general       |
| `dark`      | `#232024` | Texto principal / footer   |
| `rust`      | `#8B4A1D` | Acento primario (CTAs)     |
| `sage`      | `#4E7856` | Acento secundario (hover)  |
| `tan`       | `#DFA97C` | Tonos intermedios          |

## Cómo ejecutar

```bash
# Instalar dependencias
npm install

# Desarrollo (hot reload)
npm run build
npm run preview
```

## Créditos

- **Escuela**: Escuela N° Prov. de San Luis — Jardín Creciendo, Sala Amarilla
- **Docentes**: Karina Aguilera y Lorena Vázquez
- **Desarrollo web**: [Maguito Studio](https://maguitostudio.com.ar)
