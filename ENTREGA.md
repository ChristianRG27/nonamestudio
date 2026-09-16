# Entrega — Web corporativa Nómada Studio (Jerez de la Frontera)

Proyecto Angular 17 (standalone, prerender SSG). Esta nota acompaña al código y recoge todo lo que
falta sustituir antes de publicar, además de los entregables pedidos: imágenes con alt, eventos de
conversión y datos que la marca debe facilitar.

---

## 1. Stack y arquitectura

- Angular 17.3 standalone + signals, sin librerías de UI externas.
- Prerender SSG de las 17 rutas (HTML estático por página). El build deja la web en
  `dist/nomada-studio/browser/`; se despliega esa carpeta tal cual en cualquier hosting estático.
- SCSS propio con tokens (`src/styles.scss`) y estilos por componente.
- Sin dependencias de terceros en runtime: no hay fuentes externas, ni analítica hasta consentimiento.
- `@angular/platform-server` + `src/main.server.ts` solo se usan para el prerender en build.
- `scripts/generar-imagenes.mjs` (sharp, devDependency) genera WebP/AVIF/PNG/JPG desde los SVG fuente.
- `scripts/generar-video-hero.mjs` (sharp + `ffmpeg-static`, devDependencies) genera el vídeo ambiente
  del hero (10 s, 24 fps, bucle perfecto, sin sonido) y su póster AVIF/WebP/PNG.

Comandos:

```bash
npm start          # desarrollo en http://localhost:4200
npm run build      # build + prerender de las 17 rutas
npm run img        # regenerar imagen social y favicons desde los SVG de public/
npm run video      # regenerar vídeo y póster del hero (necesita ffmpeg-static, ya instalado)
```

Rutas prerenderizadas: `/`, `/servicios` y los 6 servicios, `/proyectos`, `/proceso`, `/recursos`,
`/sobre`, `/contacto`, `/aviso-legal`, `/privacidad`, `/cookies`, `/accesibilidad`.
La lista vive en `prerender-routes.txt` (rutas con parámetro) y se descubre el resto desde
`app.routes.ts`. Si se añaden páginas, hay que actualizar ese archivo **y** `public/sitemap.xml`.

---

## 2. Dónde se cambia cada cosa

| Qué | Dónde |
| --- | --- |
| Marca, dominio, email, teléfono, WhatsApp, dirección, horario, redes, plazo real, endpoint del formulario, GA4, URL de reserva | `src/app/core/site.config.ts` (constante `SITE`) |
| Textos de servicios, proceso, FAQ y escenarios de IA | `src/app/core/site.config.ts` |
| Textos de cada sección de la home | `src/app/pages/inicio/secciones/*.html` |
| Título/meta/canonical por página | constructores de `*.page.ts` (SeoService) |
| JSON-LD de empresa y WebSite | `src/index.html` |
| JSON-LD por página (WebPage, Service, FAQPage, ContactPage) | `*.page.ts` (SchemaService) |
| Imagen social, favicon y hero | `public/og/og-fuente.svg`, `public/favicon.svg`, `scripts/generar-video-hero.mjs` + `npm run img` / `npm run video` |
| Póster y vídeo del hero | `scripts/generar-video-hero.mjs` (escena por frame + ffmpeg) |
| Ritmo, revelado y parallax | `src/app/core/revelar.directive.ts` y `src/app/core/parallax.directive.ts` |
| Textos legales | `src/app/pages/legal/legal.page.ts` |

> La marca (`Nómada Studio`) y el dominio (`www.nomadastudio.es`) ya están aplicados en `SITE.marca`,
> `SITE.dominio`, `src/index.html`, `public/og/og-fuente.svg`, `public/site.webmanifest`,
> `public/robots.txt` y `public/sitemap.xml`. Si cambia el dominio, actualizar esos mismos puntos y
> regenerar la imagen social con `npm run img`.

---

## 3. Datos pendientes ([DATO PENDIENTE])

Antes de publicar, en `site.config.ts`:

| Dato | Valor actual |
| --- | --- |
| Razón social | `[RAZÓN SOCIAL PENDIENTE]` |
| Email | `[DATO PENDIENTE]` |
| Teléfono | `[DATO PENDIENTE]` |
| WhatsApp | `[DATO PENDIENTE]` |
| Dirección pública | `[DIRECCIÓN REAL]` |
| Código postal | `[DATO PENDIENTE]` |
| Horario | `[DATO PENDIENTE]` |
| Google Maps | vacío |
| Redes (`sameAs`) | vacío |
| Reseñas de Google reales | vacío (marcadores `[RESEÑA PENDIENTE]` en `site.config.ts`) |
| URL de la ficha de reseñas | vacío (`googleReviews`) |
| Valoración de Google | `[DATO PENDIENTE]` (`valoracionGoogle`; p. ej. «5,0 · 27 reseñas») |
| Plazo real de respuesta | `[PLAZO REAL]` |
| Endpoint del formulario / CRM | `[DATO PENDIENTE]` |
| ID GA4 | `[DATO PENDIENTE]` |
| URL de reserva de reunión | vacío |

Comportamiento actual con placeholders (a propósito, no se inventa nada):

- Los botones de teléfono/WhatsApp/email **no se renderizan** hasta que el dato sea real; en su lugar
  aparece el texto con la etiqueta pendiente, visible para que no se olvide.
- El formulario no finge un envío: si no hay endpoint, abre el cliente de correo con la solicitud
  redactada (modo `mailto`) y lo explica al usuario.
- JSON-LD: `email`, `telephone`, `sameAs`, `streetAddress`, `postalCode`, `geo` y `openingHours` están
  **omitidos** en `index.html` con un comentario indicando dónde añadirlos. No hay `AggregateRating`
  ni `Review`.
- El aviso de cookies y las páginas legales son un borrador funcional, marcado como pendiente de
  revisión legal.

---

## 4. Metadatos SEO por ruta

| Ruta | Title | Meta description |
| --- | --- | --- |
| `/` | Nómada Studio \| Diseño web, software e IA en Jerez | Webs, tiendas, CRM e IA para negocios de Jerez y Cádiz. Capta mejor, ordena el trabajo y deja de perder oportunidades. |
| `/servicios` | Servicios digitales para empresas \| Nómada Studio, Jerez | Diseño web, ecommerce, CRM y automatización para negocios que quieren crecer sin añadir más caos. |
| `/servicios/diseno-web-corporativo` | Diseño web corporativo en Jerez \| Nómada Studio | Una web clara, rápida y preparada para que te encuentren, entiendan tu propuesta y contacten contigo. |
| `/servicios/landing-pages` | Landing pages que convierten \| Nómada Studio | Páginas de campaña claras, rápidas y medibles para generar oportunidades con más contexto. |
| `/servicios/tiendas-online` | Tiendas online en Jerez y Cádiz \| Nómada Studio | Ecommerce pensado para vender con facilidad y ordenar catálogo, pedidos y operación. |
| `/servicios/restauracion-turismo` | Cartas digitales y reservas \| Nómada Studio | Cartas QR, reservas y pedidos para restauración y turismo: rápidos, claros y fáciles de actualizar. |
| `/servicios/crm-aplicaciones-web` | CRM y aplicaciones web para empresas \| Nómada Studio | Ordena contactos, tareas y datos con CRM e instrumentos digitales adaptados a tu proceso. |
| `/servicios/ia-automatizacion` | IA y automatización para empresas \| Nómada Studio | Automatiza tareas repetitivas con reglas claras, supervisión humana y datos bien conectados. |
| `/proyectos` | Proyectos \| Nómada Studio | Casos de diseño web, tiendas online, CRM y automatización en Jerez y la provincia de Cádiz. Publicamos solo proyectos reales y resultados autorizados. |
| `/proceso` | Proceso de trabajo \| Nómada Studio | Así trabajamos: descubrimiento, orden, diseño, desarrollo y mejora continua. Alcance, calendario y responsabilidades claros antes de empezar. |
| `/recursos` | Recursos \| Nómada Studio | Guías y artículos en preparación sobre automatización, CRM, SEO local y cartas digitales para empresas de Jerez y Cádiz. |
| `/sobre` | Sobre Nómada Studio \| Estudio digital en Jerez | Nómada Studio es un estudio digital con base en Jerez de la Frontera. Diseñamos webs, tiendas online, CRM y automatizaciones con criterio y sin promesas infladas. |
| `/contacto` | Contacto \| Nómada Studio, Jerez | Cuéntanos qué quieres mejorar en tu web, ventas, reservas o procesos internos. Te respondemos en [PLAZO REAL]. |
| Legales | `<Documento> \| Nómada Studio` | Descripción propia de cada documento |
| 404 | Página no encontrada \| Nómada Studio | `noindex` |

JSON-LD implementado: `Organization` + `ProfessionalService` y `WebSite` (estáticos en `index.html`),
`WebPage`/`CollectionPage`/`ContactPage` por página, `Service` en cada página de servicio y `FAQPage`
solo en la home, donde las preguntas son visibles.

---

## 5. Imágenes e ilustraciones

| Archivo | Uso | Dimensiones | Alt sugerido |
| --- | --- | --- | --- |
| `public/img/hero-ambiente-960.avif` / `-1600.avif` (+ WebP y PNG de respaldo) | Fondo del hero: elemento LCP, precargado y con `fetchpriority="high"` | 960×540 / 1600×900 | Decorativo: `alt=""`. La escena es abstracta; el significado lo aporta el texto del hero. |
| `public/video/hero-ambiente-1280.mp4` / `-640.mp4` | Pieza audiovisual del hero, «El sistema toma forma» (10 s, bucle, sin sonido, 24 fps, ~257 KB / 82 KB): tres piezas translúcidas que se alinean formando una «N», con una línea naranja y una luz turquesa recorriendo las conexiones | 1280×720 / 640×360 | Decorativo y `aria-hidden`; solo se descarga tras el póster y nunca con `prefers-reduced-motion` o ahorro de datos. |
| `public/og/og-fuente.svg` → `public/og/og-nomada-studio.jpg` | Open Graph / Twitter Card | 1200×630 | «Nómada Studio, diseño y desarrollo web en Jerez de la Frontera» (alt OG) |
| `public/favicon.svg` → `favicon-32.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | Iconos | varios | Decorativo |
| Iconos de servicio (`app-icono-servicio`) | Tarjetas de servicios | SVG en línea | Decorativos (`aria-hidden`). El texto de la tarjeta da el significado. |

Imágenes futuras recomendadas (no inventar; usar material real):

1. Foto real del equipo o del espacio de trabajo (si existe y se quiere publicar).
2. Capturas reales de 3–6 proyectos, con permiso del cliente, alt tipo: «Captura de la home del
   proyecto [nombre], sector [sector]».
3. Logotipos de clientes **solo** con autorización por escrito, alt «Logotipo de [cliente]».
4. Imagen de caso de uso de IA o panel interno, si se documenta con un caso real.

Al añadir imágenes: exportar WebP/AVIF, indicar `width`/`height`, `loading="lazy"` salvo la LCP y
`alt` descriptivo (vacío solo si es decorativa).

---

## 6. Eventos de conversión

Implementados en `AnalyticsService` y `SeoService`/plantillas mediante `data-evento`.
Solo se envían si la persona acepta la analítica y `SITE.ga4Id` es un ID real.

| Evento | Se dispara en | Implementación |
| --- | --- | --- |
| `contact_form_submit` | Envío correcto del formulario | `formulario-contacto.component.ts` (con `metodo: api \| mailto` y `origen`) |
| `phone_click` | Clic en teléfono | `data-evento="phone_click"` en footer y `contacto-directo` |
| `whatsapp_click` | Clic en WhatsApp | `data-evento="whatsapp_click"` en footer y `contacto-directo` |
| `meeting_book` | Clic para reservar reunión | `data-evento="meeting_book"` (requiere `SITE.bookingUrl`) |
| `cta_primary_click` | CTA principal del hero (micro-conversión) | `data-evento="cta_primary_click"` |

Pendiente de configurar: ID de GA4, verificación de Google Search Console (no requiere código, solo la
propiedad real) y, si se desea, eventos de Scroll/Engagement adicionales en GA4.

---

## 7. Datos que la marca debe facilitar antes de publicar

1. Nombre de marca definitivo y dominio real (con o sin `www`).
2. Razón social, NIF y datos registrales que deban figurar en el aviso legal.
3. Dirección real que se quiera publicar (o decisión de no publicar dirección) + enlace de Google Maps.
4. Email, teléfono y WhatsApp reales; horario de atención.
5. Perfiles oficiales (Instagram, LinkedIn, otros) para `sameAs`.
6. Plazo real de respuesta que se pueda cumplir (hoy `[PLAZO REAL]`).
7. Endpoint o herramienta destino del formulario (CRM, email transaccional, API propia) y su política
   de tratamiento de datos.
8. ID de GA4 y confirmación de si se usará analítica propia o de terceros.
9. URL de reserva de reunión, si se implanta (Cal.com, Calendly…).
10. Textos legales y de privacidad revisados por una persona especialista, incluida la base jurídica y
    los plazos de conservación.
11. Casos de cliente reales con autorización expresa y resultado documentado; en su defecto, mantener
    el bloque «Próximamente».
12. Logotipos y fotografías con permiso de uso.
13. Decisión sobre precios o rangos de presupuesto (hoy no se muestra ninguno).
14. Idiomas adicionales, si se quieren publicar (hoy solo español).

---

## 8. Checklist antes de publicar

- [ ] Sustituir todos los `[DATO PENDIENTE]` de `site.config.ts` y del aviso legal.
- [ ] **No publicar la sección de reseñas hasta tener reseñas reales de Google**: pegar las reseñas en
      `RESENAS` (`site.config.ts`) y añadir la URL de la ficha en `SITE.googleReviews`.
- [ ] Confirmar que `www.nomadastudio.es` es el dominio canónico y regenerar imágenes si cambia la marca (`npm run img`).
- [ ] Revisar peso y duración del vídeo si se sustituye por uno propio (mantener 8–12 s, sin sonido,
      bucle limpio y menos de ~1,5 MB) y regenerar póster con `npm run video`.
- [ ] Configurar el endpoint del formulario (o el buzón de `mailto`) y probar un envío real.
- [ ] Revisar textos legales con asesoría.
- [ ] Verificar la propiedad en Search Console y enviar `sitemap.xml`.
- [ ] Decidir política de URL (www / sin www) y redirección 301 correspondiente.
- [ ] Configurar el hosting estático: servir `dist/nomada-studio/browser`, fallback a `index.html` para
      rutas no prerenderizadas (la 404 es de cliente) y caché larga para los assets con hash.
- [ ] Medir LCP ≤ 2,5 s, INP ≤ 200 ms y CLS ≤ 0,1 en p75 móvil y escritorio (PageSpeed / CrUX).
- [ ] Pasar una auditoría de accesibilidad con teclado y lector de pantalla en las páginas clave.
- [ ] Probar el envío desde móvil real y con «reducir movimiento» activado.

---

## 9. Decisiones de diseño y accesibilidad ya aplicadas

- Paleta sobria (papel cálido + tinta) con un único color acento; contraste AA en texto y controles.
- Tipografía editorial: serif para títulos, sans de sistema para lectura; sin fuentes externas.
- Mobile-first, `prefers-reduced-motion` respetado; animaciones solo de `transform`/`opacity`.
- El hero es una escena cinematográfica: contenido alineado a la izquierda (etiqueta «Web · Software ·
  IA · Jerez», H1 «Tu negocio no necesita más ruido», texto, CTAs y línea final) y la composición en
  movimiento a la derecha. El póster es el LCP y la pieza audiovisual «El sistema toma forma» arranca en
  cuanto el póster está listo, sin esperar interacción, y nunca con movimiento reducido o ahorro de
  datos. Entrada escalonada de 620 ms (solo `opacity` y `transform`), anulada con
  `prefers-reduced-motion`. Las tres piezas (Web / CRM / Automatización) se trasladaron a la sección
  siguiente, dentro de «El problema no es solo la web».
- Cabecera fija que no desaparece: el `sticky` vive en el host de `app-cabecera`, así que acompaña toda
  la página. Es una cápsula flotante translúcida que adapta el tono a lo que tiene detrás: vidrio
  oscuro sobre el hero y las secciones oscuras, vidrio claro sobre las secciones claras, con transición
  suave. Incluye indicador de progreso de lectura bajo la cápsula, subrayado animado en la navegación,
  submenús con desplazamiento, logo que muta al pasar y botón «Hablemos». En móvil, menú a pantalla
  completa (Servicios, Proyectos, IA y Contacto, más Estudio) con foco atrapado y bloqueo de scroll;
  CTA fijo inferior que aparece tras el hero y se oculta al llegar al pie.
- Desplazamiento suave con inercia mediante Lenis (`scroll-suave.service.ts`): rueda y trackpad con
  amortiguación, enlaces internos animados con hueco para la cabecera y pausa automática al abrir el
  menú móvil. Se desactiva por completo con `prefers-reduced-motion: reduce` (vuelve al scroll nativo)
  y el táctil mantiene el desplazamiento nativo del sistema.
- Transición entre páginas con la View Transitions API (`withViewTransitions()` en `app.config.ts`):
  deslizamiento lateral puro (sin fundido): la página nueva entra desde el lado empujando y la anterior
  se desplaza ligeramente en parallax. El sentido se invierte al retroceder (botón atrás o gesto del
  navegador) y también al volver a la landing, aunque sea con un clic. Cabecera, CTA móvil y aviso de
  cookies quedan fijos (no viajan con la página) y con `prefers-reduced-motion` no hay animación. En
  navegadores sin soporte la navegación es normal. Las reglas `::view-transition-*` viven en un
  `<style>` de `index.html` porque el minificador del build las descarta.
- Ritmo editorial por capítulos: se alternan secciones claras y oscuras, y cada escena se revela con
  `opacity` 0 → 1 y `translateY(24px)` → 0 (560–680 ms) mediante IntersectionObserver y CSS, sin
  librerías. El contenido está en el HTML prerenderizado: sin JavaScript se ve todo.
- Parallax discreto (±20 px) solo en brillos decorativos de la sección «Sistemas»; nunca en texto,
  formularios ni contenido esencial.
- «Sistemas creados por Nómada»: galería de 6 prototipos de interfaz marcados como «Concepto», a
  distintas escalas y profundidades, con entrada lenta y quieta al terminar. No se ha inventado
  ningún caso de cliente.
- Efectos repartidos por toda la landing, siempre sobre `transform`/`opacity` y desactivados con
  «movimiento reducido»: revelado escalonado por grupos (`.revelar`), brillo que sigue al puntero en
  tarjetas (`.con-brillo`), líneas de conexión y de progreso que se dibujan al entrar, señal de luz
  que recorre el borde superior de bloques clave (`.senal`), barrido en botones principales,
  subrayado animado en la navegación, acento en preguntas del FAQ y acordeón con entrada suave.
- Cabecera fija: transparente y en claro sobre el hero, sólida al hacer scroll; botón «Hablemos»;
  menú móvil a pantalla completa (Servicios, Proyectos, IA y Contacto, más Estudio) con foco atrapado
  y bloqueo de scroll; CTA fijo inferior en móvil que aparece tras el hero y se oculta al llegar al
  pie para no tapar enlaces ni controles.
- El desplazamiento es el nativo del navegador, sin encaje por secciones ni interceptación de rueda.
  `scroll-padding-top` mantiene las anclas alineadas bajo la cabecera fija.
- Navegación completa por teclado, foco visible, enlace «saltar al contenido», menú móvil con `inert`.
- FAQ con `details/summary`, formularios con etiquetas, errores descriptivos y `aria-invalid`.
- Sin sliders, vídeos pesados ni glassmorphism; sin JavaScript para contenido esencial.
