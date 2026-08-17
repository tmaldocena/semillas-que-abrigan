// node scripts/generate-gallery-thumbs.mjs
// Requiere: npm install sharp --save-dev
//
// Genera versiones livianas de cada foto para usar en el stage explorable.
// Las fotos originales se siguen usando en el Lightbox (calidad completa).

import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC_DIR = path.resolve('public/gallery')
const OUT_DIR = path.resolve('public/gallery-thumb')

// ~2x el tamaño máximo en pantalla de una card (230px) para pantallas retina
const WIDTH = 420
const QUALITY = 72

async function main() {
  await mkdir(OUT_DIR, { recursive: true })

  const files = (await readdir(SRC_DIR)).filter((f) => f.toLowerCase().endsWith('.webp'))

  if (files.length === 0) {
    console.log('No se encontraron .webp en', SRC_DIR)
    return
  }

  let totalBefore = 0
  let totalAfter = 0

  for (const file of files) {
    const inPath = path.join(SRC_DIR, file)
    const outPath = path.join(OUT_DIR, file)

    const inputStat = await sharp(inPath).stats()
    const inputSize = (await import('node:fs/promises').then((fs) => fs.stat(inPath))).size

    await sharp(inPath)
      .resize(WIDTH, WIDTH, { fit: 'cover' })
      .webp({ quality: QUALITY })
      .toFile(outPath)

    const outputSize = (await import('node:fs/promises').then((fs) => fs.stat(outPath))).size

    totalBefore += inputSize
    totalAfter += outputSize

    console.log(`✓ ${file}  ${(inputSize / 1024).toFixed(0)}kb → ${(outputSize / 1024).toFixed(0)}kb`)
  }

  console.log(`\nListo: ${files.length} thumbnails en ${OUT_DIR}`)
  console.log(
    `Peso total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
