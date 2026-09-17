import { execFile } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const ejecutar = promisify(execFile);
const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const publico = join(raiz, 'public');

const ANCHO = 1280;
const ALTO = 720;
const FPS = 24;
const DURACION = 10;
const TOTAL = FPS * DURACION;

const tau = Math.PI * 2;

/** Oscilación periódica: frecuencias enteras garantizan bucle perfecto. */
const osc = (t, frecuencia, fase = 0) => Math.sin(tau * frecuencia * t + fase);

/** Suavizado 0→1 con aceleración y frenada. */
const suave = (valor) => {
  const acotado = Math.min(1, Math.max(0, valor));
  return acotado * acotado * (3 - 2 * acotado);
};

const entre = (t, inicio, fin) => suave((t - inicio) / (fin - inicio));

/**
 * Secuencia «El sistema toma forma» (10 s):
 *  0,0–0,08  las piezas flotan separadas
 *  0,08–0,20  una línea naranja recorre una pieza y enciende un punto
 *  0,20–0,50  las piezas se desplazan y encajan en una «N» modular
 *  0,50–0,80  composición estable; una luz turquesa recorre las conexiones
 *  0,80–1,00  la composición se relaja y vuelve al inicio de forma imperceptible
 */
const lineaTiempo = (t) => {
  const converge = entre(t, 0.18, 0.5);
  const retorno = entre(t, 0.8, 1);
  const encaje = converge * (1 - retorno);
  return {
    encaje,
    naranja: entre(t, 0.08, 0.19),
    puntoActivo: entre(t, 0.17, 0.24) * (1 - retorno),
    turquesa: entre(t, 0.52, 0.74) * (1 - entre(t, 0.92, 1)),
    deriva: 1 - 0.35 * retorno,
  };
};

const placas = [
  {
    /* Barra vertical izquierda de la «N» */
    desde: { x: 520, y: 250, giro: -14 },
    hasta: { x: 700, y: 352, giro: -2 },
    ancho: 104,
    alto: 408,
    retardo: 0,
  },
  {
    /* Diagonal de la «N» */
    desde: { x: 940, y: 402, giro: 22 },
    hasta: { x: 790, y: 352, giro: -27 },
    ancho: 96,
    alto: 500,
    retardo: 0.05,
  },
  {
    /* Barra vertical derecha de la «N» */
    desde: { x: 1178, y: 240, giro: 12 },
    hasta: { x: 900, y: 352, giro: 2 },
    ancho: 104,
    alto: 408,
    retardo: 0.1,
  },
];

const flotar = (t, semilla) => ({
  x: 5 * osc(t, 1, semilla),
  y: 7 * osc(t, 1, semilla + 1.7),
});

const mezcla = (desde, hasta, progreso) => ({
  x: desde.x + (hasta.x - desde.x) * progreso,
  y: desde.y + (hasta.y - desde.y) * progreso,
  giro: desde.giro + (hasta.giro - desde.giro) * progreso,
});

const placa = (config, t, indice) => {
  const { encaje, deriva } = lineaTiempo(t);
  const progreso = entre(encaje, config.retardo, 1 - config.retardo * 0.4);
  const posicion = mezcla(config.desde, config.hasta, progreso);
  const derivaFlotante = flotar(t, indice * 2.1);
  const { ancho, alto } = config;

  const desplazamientoX = posicion.x + derivaFlotante.x * deriva;
  const desplazamientoY = posicion.y + derivaFlotante.y * deriva + (1 - progreso) * 10;
  const giro = posicion.giro + 1.4 * osc(t, 1, indice * 1.9);

  const visibilidad = 0.9 + 0.1 * progreso;
  const naranja = lineaTiempo(t).naranja;
  const esPrimera = indice === 0;
  const longitudLineaNaranja = 96;
  const recorridoNaranja = esPrimera ? longitudLineaNaranja * naranja : 0;
  const puntoActivo = esPrimera ? lineaTiempo(t).puntoActivo : 0;

  return `
    <g transform="translate(${desplazamientoX.toFixed(2)} ${desplazamientoY.toFixed(2)}) rotate(${giro.toFixed(2)})" opacity="${visibilidad.toFixed(3)}">
      <ellipse cx="22" cy="${(alto / 2 + 30).toFixed(0)}" rx="${(ancho * 0.9).toFixed(0)}" ry="38" fill="url(#sombraPlaca)" />
      <rect x="${-ancho / 2}" y="${-alto / 2}" width="${ancho}" height="${alto}" rx="20"
        fill="url(#acrilico)" stroke="rgba(247,244,239,0.46)" stroke-width="1.6" />
      <rect x="${-ancho / 2 + 4}" y="${-alto / 2 + 4}" width="${ancho - 8}" height="${alto - 8}" rx="17"
        fill="none" stroke="rgba(247,244,239,0.14)" />
      <path d="M${(-ancho / 2 + 20).toFixed(0)} ${(-alto / 2 + 3).toFixed(0)} h${ancho - 40}"
        stroke="url(#brilloBorde)" stroke-width="3.6" stroke-linecap="round" />
      <path d="M${(-ancho / 2 + 12).toFixed(0)} ${(-alto / 2 + 64).toFixed(0)} L${(ancho / 2 - 12).toFixed(0)} ${(-alto / 2 + 150).toFixed(0)}"
        stroke="rgba(255,255,255,0.22)" stroke-width="14" stroke-linecap="round" />
      <path d="M${(-ancho / 2 + 12).toFixed(0)} ${(alto / 2 - 150).toFixed(0)} L${(ancho / 2 - 12).toFixed(0)} ${(alto / 2 - 64).toFixed(0)}"
        stroke="rgba(45,212,191,0.18)" stroke-width="10" stroke-linecap="round" />
      <path d="M0 ${(-alto / 2 + 26).toFixed(0)} L0 ${(alto / 2 - 26).toFixed(0)}"
        stroke="rgba(226,98,45,0.28)" stroke-width="9" stroke-linecap="round"
        stroke-dasharray="${longitudLineaNaranja} ${alto}"
        stroke-dashoffset="${(-recorridoNaranja).toFixed(2)}" opacity="0.9" />
      ${
        esPrimera
          ? `<path d="M0 ${(-alto / 2 + 26).toFixed(0)} L0 ${(alto / 2 - 26).toFixed(0)}"
              stroke="#ff8a4c" stroke-width="3.2" stroke-linecap="round"
              stroke-dasharray="${longitudLineaNaranja} ${alto}"
              stroke-dashoffset="${(-recorridoNaranja).toFixed(2)}" />
             <circle cx="0" cy="${(alto / 2 - 26).toFixed(0)}" r="${(7 + 5 * puntoActivo).toFixed(2)}"
              fill="#ff9b6a" opacity="${puntoActivo.toFixed(3)}" />
             <circle cx="0" cy="${(alto / 2 - 26).toFixed(0)}" r="64"
              fill="url(#glowPunto)" opacity="${(0.75 * puntoActivo).toFixed(3)}" />`
          : ''
      }
    </g>`;
};

const fondos = [
  { x: 190, y: 560, ancho: 420, alto: 240, giro: -8, fase: 0.2 },
  { x: 1120, y: 150, ancho: 380, alto: 220, giro: 12, fase: 0.6 },
  { x: 610, y: 90, ancho: 460, alto: 210, giro: -4, fase: 0.85 },
];

const motas = [
  { x: 320, y: 150, r: 2.2, fase: 0.1 },
  { x: 470, y: 610, r: 1.8, fase: 0.35 },
  { x: 700, y: 120, r: 2.4, fase: 0.55 },
  { x: 860, y: 620, r: 2, fase: 0.8 },
  { x: 1040, y: 260, r: 2.6, fase: 0.25 },
  { x: 1160, y: 480, r: 1.9, fase: 0.65 },
  { x: 140, y: 380, r: 2.1, fase: 0.45 },
  { x: 900, y: 90, r: 1.7, fase: 0.9 },
];

const escena = (t) => {
  const { turquesa } = lineaTiempo(t);
  const camara = {
    escala: 1 + 0.022 * osc(t, 1, 0.7),
    x: 9 * osc(t, 1, 0.2),
    y: 7 * osc(t, 1, 1.4),
  };
  const brilloFrio = { x: 1000 + 60 * osc(t, 1, 0.3), y: 210 + 40 * osc(t, 2, 1.1) };
  const brilloCalido = { x: 1010 + 70 * osc(t, 1, 2.4), y: 596 + 40 * osc(t, 2, 0.6) };

  const longitudN = 330 + 386 + 330;
  const recorridoN = -turquesa * (longitudN + 220);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}" viewBox="0 0 ${ANCHO} ${ALTO}">
    <defs>
      <linearGradient id="fondo" x1="0" y1="0" x2="0.25" y2="1">
        <stop offset="0" stop-color="#04060b" />
        <stop offset="0.55" stop-color="#070b14" />
        <stop offset="1" stop-color="#0a1018" />
      </linearGradient>
      <linearGradient id="acrilico" x1="0" y1="0" x2="0.8" y2="1">
        <stop offset="0" stop-color="#f7f4ef" stop-opacity="0.26" />
        <stop offset="0.45" stop-color="#9fd8d2" stop-opacity="0.16" />
        <stop offset="1" stop-color="#f7f4ef" stop-opacity="0.09" />
      </linearGradient>
      <linearGradient id="brilloBorde" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#f7f4ef" stop-opacity="0.05" />
        <stop offset="0.35" stop-color="#f7f4ef" stop-opacity="0.55" />
        <stop offset="1" stop-color="#f7f4ef" stop-opacity="0.05" />
      </linearGradient>
      <radialGradient id="sombraPlaca" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#000000" stop-opacity="0.5" />
        <stop offset="1" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glowFrio" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#2dd4bf" stop-opacity="0.32" />
        <stop offset="1" stop-color="#2dd4bf" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glowCalido" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#e2622d" stop-opacity="0.26" />
        <stop offset="1" stop-color="#e2622d" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="glowPunto" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#e2622d" stop-opacity="0.5" />
        <stop offset="0.55" stop-color="#e2622d" stop-opacity="0.18" />
        <stop offset="1" stop-color="#e2622d" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="vineta" cx="52%" cy="48%" r="72%">
        <stop offset="0.5" stop-color="#020409" stop-opacity="0" />
        <stop offset="1" stop-color="#020409" stop-opacity="0.58" />
      </radialGradient>
      <linearGradient id="barridoLuz" x1="0" y1="0" x2="1" y2="0.6">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0" />
        <stop offset="0.5" stop-color="#ffffff" stop-opacity="0.05" />
        <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
      </linearGradient>
      <filter id="desenfoqueFondo" x="-15%" y="-15%" width="130%" height="130%">
        <feGaussianBlur stdDeviation="9" />
      </filter>
      <filter id="desenfoquePrimerPlano" x="-15%" y="-15%" width="130%" height="130%">
        <feGaussianBlur stdDeviation="16" />
      </filter>
    </defs>

    <rect width="${ANCHO}" height="${ALTO}" fill="url(#fondo)" />
    <ellipse cx="${brilloFrio.x.toFixed(1)}" cy="${brilloFrio.y.toFixed(1)}" rx="520" ry="400" fill="url(#glowFrio)" />
    <ellipse cx="${brilloCalido.x.toFixed(1)}" cy="${brilloCalido.y.toFixed(1)}" rx="440" ry="340" fill="url(#glowCalido)" />

    <g transform="translate(${camara.x.toFixed(2)} ${camara.y.toFixed(2)}) translate(${ANCHO / 2} ${ALTO / 2}) scale(${camara.escala.toFixed(4)}) translate(${-ANCHO / 2} ${-ALTO / 2})">
      <!-- Placas desenfocadas de fondo: profundidad de campo -->
      <g filter="url(#desenfoqueFondo)" opacity="0.5">
        ${fondos
          .map((fondo) => {
            const deriva = flotar(t, fondo.fase * 5);
            return `<g transform="translate(${(fondo.x + deriva.x).toFixed(1)} ${(fondo.y + deriva.y).toFixed(1)}) rotate(${fondo.giro})">
              <rect x="${-fondo.ancho / 2}" y="${-fondo.alto / 2}" width="${fondo.ancho}" height="${fondo.alto}" rx="24"
                fill="url(#acrilico)" stroke="rgba(247,244,239,0.1)" />
              <path d="M${-fondo.ancho / 2 + 24} ${-fondo.alto / 2 + 4} h${fondo.ancho - 48}"
                stroke="rgba(247,244,239,0.22)" stroke-width="3" stroke-linecap="round" />
            </g>`;
          })
          .join('')}
      </g>

      <!-- Luz turquesa recorriendo las conexiones de la «N» -->
      <path d="M700 190 L700 520 L900 190 L900 520"
        fill="none" stroke="rgba(45,212,191,0.34)" stroke-width="2.2" stroke-linejoin="round" />
      <path d="M700 190 L700 520 L900 190 L900 520"
        fill="none" stroke="#2dd4bf" stroke-width="3.8" stroke-linecap="round" stroke-linejoin="round"
        stroke-dasharray="130 ${longitudN + 130}" stroke-dashoffset="${recorridoN.toFixed(1)}"
        opacity="1" />
      <path d="M700 190 L700 520 L900 190 L900 520"
        fill="none" stroke="rgba(45,212,191,0.28)" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"
        stroke-dasharray="130 ${longitudN + 130}" stroke-dashoffset="${recorridoN.toFixed(1)}" />

      ${placas.map((config, indice) => placa(config, t, indice)).join('')}

      <!-- Motas de polvo en suspensión -->
      ${motas
        .map((mota) => {
          const opacidad = 0.14 + 0.3 * (0.5 + 0.5 * osc(t, 2, mota.fase * tau));
          const deriva = flotar(t, mota.fase * 3.2);
          return `<circle cx="${(mota.x + deriva.x * 1.6).toFixed(1)}" cy="${(mota.y + deriva.y * 1.6).toFixed(1)}"
            r="${mota.r + 0.4}" fill="#f7f4ef" opacity="${opacidad.toFixed(3)}" />`;
        })
        .join('')}

      <!-- Primer plano desenfocado: sensación macro -->
      <g filter="url(#desenfoquePrimerPlano)" opacity="0.55">
        <rect x="${ANCHO - 300}" y="${ALTO - 210}" width="420" height="280" rx="28"
          fill="url(#acrilico)" stroke="rgba(247,244,239,0.12)" />
      </g>

      <!-- Barrido de luz de cámara -->
      <rect x="${(-200 + 1300 * t).toFixed(0)}" y="-120" width="420" height="${ALTO + 240}"
        fill="url(#barridoLuz)" transform="rotate(-14 ${ANCHO / 2} ${ALTO / 2})" />
    </g>

    <rect width="${ANCHO}" height="${ALTO}" fill="url(#vineta)" />
  </svg>`;
};

const escribir = (ruta, tarea) =>
  tarea.toFile(ruta).then((info) => console.log(`✓ ${ruta.replace(raiz + '\\', '')} (${Math.round(info.size / 1024)} KB)`));

const generarVideo = async (ancho, alto, carpeta, salida) => {
  await mkdir(carpeta, { recursive: true });
  for (let indice = 0; indice < TOTAL; indice += 1) {
    const svg = escena(indice / TOTAL).replace(`width="${ANCHO}" height="${ALTO}"`, `width="${ancho}" height="${alto}"`);
    await sharp(Buffer.from(svg))
      .resize(ancho, alto)
      .png({ compressionLevel: 3 })
      .toFile(join(carpeta, `f_${String(indice).padStart(4, '0')}.png`));
  }
  await ejecutar(ffmpeg, [
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    join(carpeta, 'f_%04d.png'),
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '30',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    '-an',
    salida,
  ]);
  console.log(`✓ ${salida.replace(raiz + '\\', '')}`);
};

const base = join(tmpdir(), 'nomada-video-hero');
await mkdir(join(publico, 'video'), { recursive: true });

const posterSvg = Buffer.from(escena(0));
for (const ancho of [960, 1600]) {
  await escribir(
    join(publico, 'img', `hero-ambiente-${ancho}.avif`),
    sharp(posterSvg, { density: 150 }).resize({ width: ancho }).avif({ quality: 58 }),
  );
  await escribir(
    join(publico, 'img', `hero-ambiente-${ancho}.webp`),
    sharp(posterSvg, { density: 150 }).resize({ width: ancho }).webp({ quality: 80 }),
  );
}
await escribir(
  join(publico, 'img', 'hero-ambiente-960.png'),
  sharp(posterSvg, { density: 150 }).resize({ width: 960 }).png({ compressionLevel: 9 }),
);

await generarVideo(1280, 720, join(base, 'escritorio'), join(publico, 'video', 'hero-ambiente-1280.mp4'));
await generarVideo(640, 360, join(base, 'movil'), join(publico, 'video', 'hero-ambiente-640.mp4'));

await rm(base, { recursive: true, force: true });
console.log('\nVídeo y póster generados.');
