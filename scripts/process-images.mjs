// Usage: node scripts/process-images.mjs <source-dir>
// Produces web-ready images in public/images from the raw Facebook downloads.
import sharp from 'sharp'
import path from 'node:path'
import fs from 'node:fs'

const src = process.argv[2]
if (!src) { console.error('source dir required'); process.exit(1) }
const out = path.resolve('public/images')
fs.mkdirSync(path.join(out, 'posters'), { recursive: true })

const photo = async (file, name, width = 1600, quality = 80) => {
  await sharp(path.join(src, file)).rotate().resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true }).toFile(path.join(out, name))
  console.log('photo', name)
}

const poster = async (file, name) => {
  await sharp(path.join(src, file)).resize({ height: 1200, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(out, 'posters', name))
  console.log('poster', name)
}

// Logo: flood-fill the olive background from the corners to transparency.
const logo = async () => {
  const img = sharp(path.join(src, 'logo_911.jpg')).ensureAlpha()
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: c } = info
  const idx = (x, y) => (y * w + x) * c
  const bg = [data[idx(4, 4)], data[idx(4, 4) + 1], data[idx(4, 4) + 2]]
  const dist = (i) => Math.hypot(data[i] - bg[0], data[i + 1] - bg[1], data[i + 2] - bg[2])
  const TOL = 42
  const seen = new Uint8Array(w * h)
  const stack = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]]
  while (stack.length) {
    const [x, y] = stack.pop()
    if (x < 0 || y < 0 || x >= w || y >= h) continue
    const p = y * w + x
    if (seen[p]) continue
    const d = dist(p * c)
    if (d > TOL) continue
    seen[p] = 1
    data[p * c + 3] = d < TOL * 0.6 ? 0 : Math.round(255 * ((d - TOL * 0.6) / (TOL * 0.4)))
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1])
  }
  const png = sharp(data, { raw: { width: w, height: h, channels: 4 } }).trim()
  await png.clone().resize({ width: 720 }).png({ compressionLevel: 9 }).toFile(path.join(out, 'logo-kami.png'))
  await png.clone().resize({ width: 160 }).png().toFile(path.join(out, 'logo-kami-160.png'))
  console.log('logo done')
}

// DuitNow QR crop from the Sedekah Jumaat poster (904x1280).
const qr = async () => {
  await sharp(path.join(src, 'p09_05dec_dakwah.jpg'))
    .extract({ left: 598, top: 748, width: 262, height: 262 })
    .resize({ width: 480 }).png().toFile(path.join(out, 'duitnow-qr.png'))
  console.log('qr done')
}

await logo()
await qr()
await photo('cover_960.jpg', 'volunteers-group.jpg', 1400, 82)
await photo('a01_02oct.jpg', 'kenduri-serving-01.jpg')
await photo('a02_02oct.jpg', 'kenduri-serving-02.jpg')
await photo('a03_02oct.jpg', 'kenduri-crowd.jpg')
await photo('a04_02oct.jpg', 'kenduri-serving-03.jpg')
await photo('a05_02oct.jpg', 'kenduri-serving-04.jpg')
await photo('a06_02oct_portrait.jpg', 'azan-competition.jpg', 1100)
await photo('a07_02oct.jpg', 'volunteers-loading.jpg')
await photo('a08_02oct.jpg', 'kelas-fardhu-ain.jpg')
await poster('p03_28jun_dakwah_belantara.jpg', 'amal-islami-2026.jpg')
await poster('p06_18apr_qurban.jpg', 'qurban-2026.jpg')
await poster('p08_02jan_iftar.jpg', 'iftar-2026.jpg')
await poster('p09_05dec_dakwah.jpg', 'dakwah-belantara-2025.jpg')
