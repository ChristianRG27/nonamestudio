# Nómada Studio — Web corporativa

Web de estudio digital en Jerez de la Frontera: diseño web, tiendas online, CRM y automatización con IA.
Angular 17 (standalone + signals) con prerender SSG. Todo el contenido editable está centralizado en
`src/app/core/site.config.ts`.

## Comandos

```bash
npm install        # instalar dependencias
npm start          # servidor de desarrollo (http://localhost:4200)
npm run build      # build de producción + prerender de 17 rutas -> dist/nomada-studio/browser
npm run img        # regenerar imagen social y favicons desde los SVG de public/
npm run video      # regenerar vídeo ambiente y póster del hero (sharp + ffmpeg-static)
```

## Despliegue de `dev` en Vercel

Cada push a `dev` ejecuta `.github/workflows/deploy-dev.yml` y crea un despliegue **Preview** en Vercel. El build publica las rutas prerenderizadas de `dist/nomada-studio/browser`.

Antes del primer push, crea o vincula el proyecto en Vercel y configura estos secretos en **GitHub → Settings → Secrets and variables → Actions**:

- `VERCEL_TOKEN`: token de acceso de Vercel.
- `VERCEL_ORG_ID` y `VERCEL_PROJECT_ID`: valores `orgId` y `projectId` de `.vercel/project.json`, generados por `vercel link`.

El proyecto de Vercel debe apuntar a la raíz de este repositorio. Si también conectas el repositorio mediante la integración Git de Vercel, desactiva sus despliegues automáticos de `dev` para evitar despliegues duplicados.

## Antes de publicar

Lee **`ENTREGA.md`**: contiene los placeholders `[DATO PENDIENTE]`, los datos que debe facilitar la
marca, la lista de imágenes con alt, los eventos de conversión y el checklist de lanzamiento.

Para revisar o reescribir la copy, **`TEXTOS.md`** es el inventario completo: todos los textos del
sitio, dónde aparecen y en qué archivo se editan.

## Estructura

```
src/app/
  core/        configuración de marca (site.config.ts), SEO, JSON-LD, analítica y consentimiento
  shared/      cabecera, pie, formulario de contacto, aviso de cookies, iconos
  pages/       inicio (secciones), servicios, proyectos, proceso, recursos, sobre, contacto, legal, 404
public/        robots.txt, sitemap.xml, favicon, imágenes del hero y Open Graph
scripts/       generación de imágenes (sharp)
```
