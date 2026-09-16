import { mkdir, readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const publico = join(raiz, 'public');

const svg = (ruta) => readFile(join(raiz, ruta));

const escribir = async (destino, tarea) => {
  await mkdir(dirname(destino), { recursive: true });
  const info = await tarea.toFile(destino);
  console.log(`✓ ${destino.replace(raiz + '\\', '')} (${Math.round(info.size / 1024)} KB)`);
};

const og = await svg('public/og/og-fuente.svg');
await escribir(
  join(publico, 'og', 'og-nomada-studio.jpg'),
  sharp(og, { density: 150 }).resize({ width: 1200, height: 630 }).jpeg({ quality: 84, mozjpeg: true }),
);

const favicon = await svg('public/favicon.svg');
for (const [destino, tamano] of [
  ['favicon-32.png', 32],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
  ['apple-touch-icon.png', 180],
]) {
  await escribir(
    join(publico, destino),
    sharp(favicon, { density: 384 }).resize({ width: tamano, height: tamano }),
  );
}

console.log('\nImágenes generadas. Ejecuta de nuevo tras editar los SVG fuente.');
