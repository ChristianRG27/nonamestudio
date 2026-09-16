# Landing (`/`) — todos los textos para revisión

Guion completo de la página de inicio, **en el orden en que se ve** al hacer scroll. Cada bloque indica
de dónde sale el texto para poder editarlo después. Los textos entre corchetes (`[DATO PENDIENTE]`,
`[PLAZO REAL]`, etc.) son marcadores pendientes de sustituir por datos reales.

> Estado: refleja el código actual, incluida la sección nueva de texto que se pinta con el scroll y el
> cambio del botón de cabecera. Para el resto de páginas del sitio existe además `TEXTOS.md`.

---

## 0. Resumen de la pantalla

| # | Bloque | Fondo | Archivo principal |
| --- | --- | --- | --- |
| 1 | Cabecera fija | Cristal (claro/oscuro según sección) | `src/app/shared/cabecera.component.html` |
| 2 | Hero | Oscuro (vídeo/imagen) | `src/app/pages/inicio/secciones/hero.component.html` |
| 3 | Manifiesto que se pinta con el scroll | Lavado (`--papel-100`) | `src/app/pages/inicio/secciones/texto-scroll.component.ts` |
| 4 | El problema no es solo la web | Papel | `src/app/pages/inicio/secciones/valor.component.*` |
| 5 | IA que sirve para algo | Oscuro | `src/app/pages/inicio/secciones/ia.component.html` |
| 6 | Sin cajas negras (método) | Papel | `src/app/pages/inicio/secciones/metodo.component.html` |
| 7 | Sistemas que encajan | Noche | `src/app/pages/inicio/secciones/sistemas.component.html` |
| 8 | Cerca, cuando importa (Jerez) | Papel | `src/app/pages/inicio/secciones/local.component.html` |
| 9 | Reseñas de Google | Lavado | `src/app/pages/inicio/secciones/resenas.component.html` |
| 10 | Dudas razonables (FAQ) | Papel | `src/app/pages/inicio/secciones/faq.component.html` |
| 11 | El siguiente paso (conversión) | Lavado | `src/app/pages/inicio/secciones/conversion.component.html` |
| 12 | Pie de página | Oscuro | `src/app/shared/pie.component.html` |
| — | CTA fijo (solo móvil) | — | `src/app/shared/cta-movil.component.html` |
| — | Aviso de cookies | — | `src/app/shared/banner-cookies.component.html` |

---

## 1. Cabecera fija

**Marca:** «Nómada Studio» (enlaza a `/`) · etiqueta accesible del logo: «Nómada Studio, inicio».

**Menú de escritorio** (`site.config.ts` → `NAVEGACION`):

| Enlace | Ruta | Desplegable |
| --- | --- | --- |
| Servicios | `/servicios` | Sí (ver abajo) |
| Proyectos | `/proyectos` | — |
| Estudio | `/sobre` | Sí: «Cómo trabajamos» (`/proceso`), «Recursos útiles» (`/recursos`), «Sobre Nómada Studio» (`/sobre`) |

**Desplegable «Servicios»** (título + descripción):

| Título | Descripción |
| --- | --- |
| Web corporativa | Que te entiendan y contacten contigo. |
| Landing pages | Una campaña, un objetivo, menos distracciones. |
| Tiendas online | Vender sin complicar la operación. |
| Restauración y turismo | Cartas, reservas y experiencias que sí se usan. |
| CRM y aplicaciones web | Menos caos. Cada contacto en su sitio. |
| IA y automatización | Quita trabajo repetitivo sin perder el control. |

**Botón destacado:** «Hablemos de tu proyecto» → `/contacto`
*(estilo nuevo: píldora oscura compacta que se invierte sobre fondos oscuros)*.

**Menú móvil** (pantalla completa):

- Enlaces grandes: «Servicios», «Proyectos», «IA», «Contacto».
- Enlaces secundarios: «Cómo trabajamos», «Recursos útiles», «Sobre Nómada Studio».
- Cierra con el botón «Hablemos de tu proyecto».
- Botón de menú: «Abrir menú» / «Cerrar menú» (solo lector de pantalla).

---

## 2. Hero

| Elemento | Texto |
| --- | --- |
| Etiqueta superior | Web · Software · IA · Jerez |
| Titular (H1) | Tu negocio no necesita más ruido. |
| Titular, segundo golpe | Necesita más **claridad, orden, tiempo, sistema.** (palabras que se escriben y borran en bucle; versión accesible sin animación: «claridad, orden, tiempo y sistema») |
| Entrada | Necesita una parte digital que atraiga oportunidades, las ordene y le quite trabajo al equipo. |
| Botón principal | Cuéntanos qué necesitas → `/contacto` |
| Botón secundario | Ver cómo trabajamos → `/proceso` |
| Línea final | Web que atrae · CRM que ordena · IA que libera |
| Aviso de scroll | Desliza para descubrir |

---

## 3. Manifiesto que se pinta con el scroll *(sección nueva)*

Un único párrafo grande en tipografía editorial. Todo el texto está visible desde el principio en gris
claro y se va oscureciendo palabra a palabra, de izquierda a derecha, según avanza el scroll. Ocupa
160vh en móvil y 180vh en escritorio, con el texto fijado mientras se recorre.

**Texto completo:**

> Cada negocio que crece empieza igual: alguien entiende lo que haces, confía en ti y da el primer paso.
> Nosotros construimos la parte digital que lo hace posible: una web que atrae, un sistema que ordena y
> una IA que devuelve tiempo al equipo.

- Sin antetítulo ni botón: solo el párrafo como protagonista.
- Fuente del texto: constante `TEXTO_POR_DEFECTO` en `texto-scroll.component.ts`
  (también se puede pasar por input: `<app-texto-scroll texto="…" />`).

---

## 4. El problema no es solo la web

- **Antetítulo:** El problema no es solo la web
- **H2:** Si tu negocio crece, tus herramientas tienen que acompañarlo.
- **Párrafo:** Una web bonita no basta si los mensajes se quedan sin responder, las reservas llegan por
  cinco sitios o el equipo pierde tiempo buscando información. Diseñamos todo el recorrido: desde la
  primera visita hasta el siguiente paso de tu equipo.

**Tres pilares:**

| Nº | Título | Texto |
| --- | --- | --- |
| 01 | Que te encuentren | Una web rápida, clara y preparada para que Google y las personas entiendan lo que ofreces. |
| 02 | Que confíen en ti | Mensajes que responden dudas antes de que tengan que preguntarlas. |
| 03 | Que el trabajo fluya | Formularios, reservas, CRM e IA conectados solo cuando aportan algo. |

---

## 5. IA que sirve para algo

- **Antetítulo:** IA que sirve para algo
- **H2:** Menos promesas sobre IA. Más trabajo resuelto.
- **Párrafo:** Antes de automatizar, entendemos qué tarea se repite, qué información necesita y dónde
  debe intervenir una persona. Después diseñamos una solución que tu equipo pueda entender, supervisar y
  mejorar.
- **Etiqueta del bloque:** Así puede ayudarte

**Cuatro escenarios:**

| Nº | Título | Descripción |
| --- | --- | --- |
| 01 | Responde lo primero | Atiende las dudas repetidas y pasa al equipo una conversación completa, no un mensaje suelto. |
| 02 | Ordena cada solicitud | Clasifica contactos y crea oportunidades con la información que de verdad importa. |
| 03 | Prepara el trabajo | Resume datos y prepara borradores para presupuestos, seguimientos o respuestas. |
| 04 | Reúne lo disperso | Centraliza reservas, consultas y tareas para evitar duplicados y olvidos. |

- **Nota destacada:** La IA no decide por tu negocio. Definimos permisos, límites y revisión humana
  antes de ponerla a trabajar.
- **Botón:** Ver soluciones de IA y automatización → `/servicios/ia-automatizacion`

---

## 6. Sin cajas negras (método)

- **Antetítulo:** Sin cajas negras
- **H2:** Sabes qué vamos a hacer, cuándo y para qué.
- **Párrafo:** Un buen proyecto no empieza enseñando una pantalla. Empieza entendiendo qué está fallando
  hoy y qué tendría que cambiar mañana.
- **Recuadro:** Antes de empezar tendrás un alcance claro, un calendario realista y responsabilidades por
  escrito.
- **Enlace:** Conoce nuestro proceso → `/proceso`

**Cinco pasos:**

| Nº | Título | Resumen |
| --- | --- | --- |
| 01 | Entendemos | Hablamos de tus clientes, tus objetivos y los puntos donde hoy se atasca el trabajo. |
| 02 | Damos forma | Ordenamos páginas, mensajes, contenidos y recorridos antes de diseñar. |
| 03 | Diseñamos | Convertimos la estrategia en una interfaz clara, reconocible y fácil de usar. |
| 04 | Construimos | Desarrollamos, conectamos y probamos cada pieza antes de publicar. |
| 05 | Medimos y mejoramos | Lanzamos, formamos a tu equipo y priorizamos el siguiente avance. |

---

## 7. Sistemas que encajan

- **Antetítulo:** Lo que ocurre cuando las piezas encajan
- **H2:** No hacemos pantallas sueltas. Diseñamos sistemas que se entienden entre sí.
- **Párrafo:** Una web puede ser solo el escaparate o el punto de partida de algo más útil: reservas que
  llegan ordenadas, una tienda conectada con la operación, contactos que no se pierden y tareas que dejan
  de repetirse.

**Seis piezas** (todas con la etiqueta «Concepto» y enlace «Ver …»):

| Título | Enlace |
| --- | --- |
| Una web que convierte visitas en conversaciones | Ver web corporativa |
| Un CRM que muestra qué toca hacer ahora | Ver CRM y aplicaciones web |
| Un flujo que quita trabajo repetitivo | Ver IA y automatización |
| Reservas y carta digital sin fricción | Ver soluciones para restauración |
| Una tienda que no complica el back office | Ver tiendas online |
| Una campaña que se puede medir de verdad | Ver landing pages |

**Cierre:**

- **Sello:** HECHO PARA FUNCIONAR · HECHO CON NÓMADA
- **Botón:** Ver proyectos y casos → `/proyectos`
- **Nota:** Estas piezas son conceptos de producto. Los casos de clientes se publicarán únicamente con su
  autorización.

---

## 8. Cerca, cuando importa (Jerez)

- **Antetítulo:** Cerca, cuando importa
- **H2:** De Jerez para negocios que no quieren quedarse quietos.
- **Párrafo:** Tenemos base en Jerez de la Frontera y entendemos el día a día de quienes viven de
  atender, vender, reservar y cumplir plazos. Podemos sentarnos contigo o trabajar a distancia: lo
  importante es que el proyecto avance.
- **Lista:**
  - Presencial o por videollamada, según lo que te resulte más útil.
  - Experiencia pensada para negocios de la provincia de Cádiz.
  - Colaboración remota cuando el proyecto lo pide.
- **Ficha lateral:** 36.685° N · 6.126° O — «Jerez de la Frontera» · «Cádiz»

---

## 9. Reseñas de Google

- **Antetítulo:** Reseñas de Google
- **H2:** Todos los clientes están contentos y lo dicen en Google.
- **Marquesina:** dos filas de tarjetas en sentidos opuestos con estrellas, texto, autor, servicio y la
  etiqueta «Google». Ya no se detiene al pasar el cursor.

**Estado actual (pendiente de reseñas reales):**

- Las tarjetas muestran marcadores: `[RESEÑA PENDIENTE: pega aquí una reseña real de Google]`,
  `[NOMBRE DEL CLIENTE]`, `[SERVICIO]`.
- Botón: «Leer las reseñas en Google» (solo si hay URL real en `SITE.googleReviews`). Si no, se muestra:
  «Ficha de Google: [DATO PENDIENTE] · pega aquí la URL real de tus reseñas».

---

## 10. Dudas razonables (FAQ)

- **Antetítulo:** Dudas razonables
- **H2:** Antes de empezar, hablemos claro.

| Pregunta | Respuesta |
| --- | --- |
| ¿Cuánto cuesta una web? | Depende de lo que tenga que resolver: contenido, funcionalidades, integraciones y complejidad. Tras hablar contigo, recibirás una propuesta con alcance, precio e inclusiones claras. |
| ¿La web será mía? | Sí. Dejamos por escrito quién tiene el dominio, los accesos y los entregables. No construimos dependencias innecesarias. |
| ¿Solo trabajáis en Jerez? | Nuestra base está en Jerez de la Frontera. Trabajamos habitualmente en Cádiz y también a distancia. |
| ¿Incluís SEO? | Toda web nace con una base técnica y de contenidos para que se pueda encontrar. Posicionar de forma sostenida exige después trabajo, contenido útil y autoridad real. |
| ¿Qué puede automatizar la IA? | Lo que tenga sentido: consultas repetidas, clasificación de contactos, resúmenes o preparación de tareas. Primero revisamos el proceso; después decidimos si merece automatizarse. |
| ¿Podré actualizar la web? | Sí. Elegimos un sistema de edición adaptado a tu equipo y te enseñamos a usarlo. |

---

## 11. El siguiente paso (conversión)

- **Antetítulo:** El siguiente paso
- **H2:** Cuéntanos qué te está frenando.
- **Párrafo:** Puede ser una web que ya no representa a tu negocio, contactos que se pierden, una tienda
  difícil de gestionar o demasiado trabajo repetitivo. Cuéntanos el punto de partida; te diremos si
  podemos ayudarte y por dónde empezaríamos.
- **Contacto directo:** «¿Prefieres hablarlo? Llámanos, escríbenos por WhatsApp o reserva una
  conversación.»
  - Mientras falten datos reales, se muestra: «WhatsApp, teléfono y email: [DATO PENDIENTE]».
  - Con datos reales aparecerían: teléfono, «Escribir por WhatsApp», email y «Reservar una reunión»
    (si hay URL).

**Formulario «Empezar una conversación»:**

| Campo | Etiqueta | Ayuda / Error |
| --- | --- | --- |
| Nombre | Tu nombre * | Error: «Escribe tu nombre para saber cómo dirigirnos a ti.» |
| Empresa | Empresa o proyecto * | Error: «Indica el nombre de tu empresa o proyecto.» |
| Email | Tu email * | Error: «Revisa el email: parece que falta algo.» |
| Teléfono | Teléfono, si prefieres que te llamemos | Error: «Revisa el número de teléfono.» |
| Mensaje | ¿Qué te gustaría mejorar? * | Ayuda: «Cuéntanos qué está pasando ahora y qué te gustaría que cambiara. No hace falta que tengas la solución pensada.» · Error: «Cuéntanos al menos un poco qué necesitas.» |
| Presupuesto | Presupuesto aproximado, si lo tienes | Ayuda: «Puedes indicarnos un rango o decirnos que todavía no lo tienes claro.» |
| Consentimiento | Acepto que Nómada Studio use mis datos para responder a esta consulta. | Error: «Necesitamos tu consentimiento para poder responderte.» |

- **Botón:** «Enviar consulta» (durante el envío: «Enviando tu mensaje…»).
- **Nota legal:** Usaremos estos datos solo para responderte. Consulta nuestra Política de privacidad.
- **Mensajes de estado:**
  - Correcto: «Recibido. Te responderemos en [PLAZO REAL].»
  - Sin gestor de envío: «Tu mensaje está listo en el correo. Envíalo y te responderemos en
    [PLAZO REAL].»
  - Error: «No hemos podido enviarlo ahora. Prueba de nuevo en unos minutos, o escríbenos directamente a
    [DATO PENDIENTE].»

---

## 12. Pie de página

- **Marca:** Nómada Studio → `/`
- **Reclamo:** Web, software e IA para negocios que quieren funcionar mejor.
- **Frase de ubicación:** Con base en Jerez de la Frontera. Trabajamos donde esté tu negocio.
  (+ «Cómo llegar», solo si hay URL real de Google Maps).
- **Columna «Servicios»:** Web corporativa · Landing pages · Tiendas online · Restauración y turismo ·
  CRM y aplicaciones web · IA y automatización.
- **Columna «Estudio»:** Proyectos · Cómo trabajamos · Recursos útiles · Sobre Nómada Studio · Contacto.
- **Columna «Contacto»:** email, teléfono y, si hay datos reales, WhatsApp y horario. Ahora se muestra
  «Email: [DATO PENDIENTE]» y «Teléfono: [DATO PENDIENTE]».
- **Línea legal:** © Nómada Studio · Jerez de la Frontera — Aviso legal · Privacidad · Cookies ·
  Accesibilidad.

---

## 13. Elementos flotantes de la landing

### CTA fijo inferior (solo móvil)

- **Botón:** «Cuéntanos qué necesitas» → `/contacto`.
- Aparece tras pasar el hero y se oculta al llegar al pie o mientras se muestra el aviso de cookies.

### Aviso de cookies

- **Párrafo:** Usamos solo lo imprescindible para que la web funcione. Si aceptas la analítica, nos
  ayudas a entender qué te interesa y a mejorar la experiencia. No vendemos tus datos ni activamos estas
  herramientas hasta que tú lo decidas.
- **Enlace:** Política de cookies
- **Botones:** «Aceptar analítica» · «Solo lo imprescindible»
- **Etiqueta accesible:** «Aviso sobre cookies y analítica»

---

## 14. SEO y estructura de encabezados

- **Title:** Nómada Studio | Diseño web, software e IA en Jerez
- **Meta description:** Webs, tiendas, CRM e IA para negocios de Jerez y Cádiz. Capta mejor, ordena el
  trabajo y deja de perder oportunidades.

**Encabezados en orden de aparición:**

1. H1 — Tu negocio no necesita más ruido.
2. H2 — *(manifiesto de la sección nueva)* «Cada negocio que crece empieza igual…»
3. H2 — Si tu negocio crece, tus herramientas tienen que acompañarlo. + H3 de los tres pilares.
4. H2 — Menos promesas sobre IA. Más trabajo resuelto. + H3 de los cuatro escenarios.
5. H2 — Sabes qué vamos a hacer, cuándo y para qué. + H3 de los cinco pasos.
6. H2 — No hacemos pantallas sueltas. Diseñamos sistemas que se entienden entre sí. + H3 por pieza.
7. H2 — De Jerez para negocios que no quieren quedarse quietos.
8. H2 — Todos los clientes están contentos y lo dicen en Google.
9. H2 — Antes de empezar, hablemos claro.
10. H2 — Cuéntanos qué te está frenando. + H3 «Empezar una conversación».

**Datos pendientes que aparecen en la landing:** `[DATO PENDIENTE]` (email, teléfono, WhatsApp, horario,
valoración de Google), `[PLAZO REAL]` (mensajes del formulario y del aviso de éxito), `[RESEÑA
PENDIENTE]` / `[NOMBRE DEL CLIENTE]` / `[SERVICIO]` (tarjetas de reseñas). Se editan en
`src/app/core/site.config.ts`.
