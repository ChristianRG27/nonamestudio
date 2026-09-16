# Inventario de textos — Nómada Studio

Documento de referencia con **todos los textos del sitio** tras la reformulación de conversión:
qué dice cada pieza, dónde aparece y en qué archivo se edita. La web se genera desde el código, así que
este archivo es la vista de contenido, no la fuente de la verdad: al editar, hazlo en los archivos
indicados.

---

## 0. Dónde se edita cada texto (fuentes de la verdad)

| Contenido | Archivo | Notas |
| --- | --- | --- |
| Marca, dominio, contacto, redes, plazo, endpoint, GA4 y textos de servicios, FAQ, proceso, método e IA | `src/app/core/site.config.ts` | Fuente única; lo que cambia aquí se refleja en toda la web |
| Textos fijos de cada sección de la home | `src/app/pages/inicio/secciones/*.html` | Hero, valor, servicios, IA, método, sistemas, local, FAQ, conversión |
| Encabezados y textos de páginas interiores | `src/app/pages/**/*.page.html` y `*.page.ts` | Proyectos, proceso, recursos, sobre, contacto, legales, 404 |
| Cabecera, menú móvil y CTA fijo | `src/app/shared/cabecera.component.html` · `cta-movil.component.html` | Etiquetas de navegación desde `NAVEGACION` (config) |
| Pie de página | `src/app/shared/pie.component.html` | Columnas, enlaces legales y datos de contacto |
| Formulario | `src/app/shared/formulario-contacto.component.html` | Etiquetas, ayudas, errores y mensajes de estado |
| Aviso de cookies | `src/app/shared/banner-cookies.component.html` | Texto, enlaces y botones |
| Textos legales | `src/app/pages/legal/legal.page.ts` | Aviso legal, privacidad, cookies y accesibilidad |
| Metadatos SEO (title/description/canonical) | `SeoService` en cada `*.page.ts` + `src/index.html` | Resumen en `ENTREGA.md` (§4) |

Marcadores que verás en los textos: `[DATO PENDIENTE]`, `[PLAZO REAL]`, `[DIRECCIÓN REAL]`,
`[RAZÓN SOCIAL PENDIENTE]`.

---

## 1. Textos globales

### 1.1 Cabecera (escritorio)

| Elemento | Texto | Destino |
| --- | --- | --- |
| Marca | «Nómada Studio» | `/` |
| Menú | «Servicios» (desplegable), «Proyectos», «Estudio» (desplegable) | `/servicios`, `/proyectos`, `/sobre` |
| Botón destacado | «Hablemos de tu proyecto» | `/contacto` |
| Etiqueta accesible del logo | «Nómada Studio, inicio» | — |
| Estado del botón de menú | «Abrir menú» / «Cerrar menú» | — |

**Desplegable «Servicios»** (título + descripción):

| Título | Descripción | Destino |
| --- | --- | --- |
| Web corporativa | Que te entiendan y contacten contigo. | `/servicios/diseno-web-corporativo` |
| Landing pages | Una campaña, un objetivo, menos distracciones. | `/servicios/landing-pages` |
| Tiendas online | Vender sin complicar la operación. | `/servicios/tiendas-online` |
| Restauración y turismo | Cartas, reservas y experiencias que sí se usan. | `/servicios/restauracion-turismo` |
| CRM y aplicaciones web | Menos caos. Cada contacto en su sitio. | `/servicios/crm-aplicaciones-web` |
| IA y automatización | Quita trabajo repetitivo sin perder el control. | `/servicios/ia-automatizacion` |

**Desplegable «Estudio»**: «Cómo trabajamos», «Recursos útiles», «Sobre Nómada Studio».

### 1.2 Menú móvil (pantalla completa)

Enlaces grandes: «Servicios», «Proyectos», «IA», «Contacto». Enlaces secundarios: «Cómo trabajamos»,
«Recursos útiles», «Sobre Nómada Studio». Cierra con el botón «Hablemos de tu proyecto». Etiqueta
accesible del panel: «Menú».

### 1.3 CTA fijo inferior (solo móvil)

- Botón: «Cuéntanos qué necesitas» → `/contacto`.
- Aparece al superar el hero; se oculta al llegar al pie y mientras se muestra el aviso de cookies.

### 1.4 Aviso de cookies

- Párrafo: «Usamos solo lo imprescindible para que la web funcione. Si aceptas la analítica, nos ayudas a
  entender qué te interesa y a mejorar la experiencia. No vendemos tus datos ni activamos estas
  herramientas hasta que tú lo decidas.»
- Enlace: «Política de cookies».
- Botones: «Aceptar analítica» y «Solo lo imprescindible».
- Etiqueta accesible: «Aviso sobre cookies y analítica».

### 1.5 Pie de página

- Marca: «Nómada Studio» → `/`.
- Reclamo: «Web, software e IA para negocios que quieren funcionar mejor.»
- Ubicación: «Con base en Jerez de la Frontera. Trabajamos donde esté tu negocio.» (+ «Cómo llegar» solo
  si hay URL de Google Maps).
- Dirección: solo se muestra si es un dato real (`[DIRECCIÓN REAL]`).
- Columna **Servicios**: Web corporativa · Landing pages · Tiendas online · Restauración y turismo · CRM
  y aplicaciones web · IA y automatización.
- Columna **Estudio**: Proyectos · Cómo trabajamos · Recursos útiles · Sobre Nómada Studio · Contacto.
- Columna **Contacto**: email, teléfono, «WhatsApp» y horario. Mientras no haya dato real se muestra la
  etiqueta pendiente (p. ej. «Teléfono: [DATO PENDIENTE]») y no se genera el enlace. Los perfiles
  sociales aparecen solo si hay URL.
- Línea legal: «© Nómada Studio · Jerez de la Frontera» y enlaces «Aviso legal», «Privacidad»,
  «Cookies», «Accesibilidad».

### 1.6 Textos no visibles (accesibilidad)

- Enlace de salto: «Saltar al contenido principal».
- Los enlaces de servicio se anuncian como «Ver [nombre corto]» (p. ej. «Ver web corporativa»), las
  tarjetas del hero como «[Etiqueta]: [Verbo]. [Descripción]» y los iconos y mockups van marcados como
  decorativos.

---

## 2. Inicio (landing)

### 2.1 Hero

| Elemento | Texto |
| --- | --- |
| Etiqueta superior | «Web · Software · IA · Jerez» |
| H1 | «Tu negocio no necesita más ruido.» |
| Texto | «Necesita una parte digital que atraiga oportunidades, las ordene y le quite trabajo al equipo.» |
| CTA principal | «Cuéntanos qué necesitas» → `/contacto` |
| CTA secundario | «Ver cómo trabajamos» → `/proceso` |
| Línea final | «Web que atrae · CRM que ordena · IA que libera» |

El hero no contiene tarjetas: las tres piezas (Web / CRM / Automatización) se muestran en la sección
siguiente (ver 2.2). El fondo es la pieza audiovisual «El sistema toma forma» (ver `ENTREGA.md` §5).

### 2.2 Problema / propuesta de valor

- Antetítulo: «El problema no es solo la web».
- H2: «Si tu negocio crece, tus herramientas tienen que acompañarlo.»
- Párrafo: «Una web bonita no basta si los mensajes se quedan sin responder, las reservas llegan por
  cinco sitios o el equipo pierde tiempo buscando información. Diseñamos todo el recorrido: desde la
  primera visita hasta el siguiente paso de tu equipo.»

| Nº | Pilar | Texto |
| --- | --- | --- |
| 01 | Que te encuentren | Una web rápida, clara y preparada para que Google y las personas entiendan lo que ofreces. |
| 02 | Que confíen en ti | Mensajes que responden dudas antes de que tengan que preguntarlas. |
| 03 | Que el trabajo fluya | Formularios, reservas, CRM e IA conectados solo cuando aportan algo. |

**Bloque «Un sistema que trabaja contigo»** (las tres piezas que antes vivían en el hero; la primera es
la que cerró el hero en la versión anterior):

| Nº | Etiqueta | Verbo | Descripción | Destino |
| --- | --- | --- | --- | --- |
| 01 | Web | Atrae | Que quien te busca entienda lo que haces y dé el paso. | `/servicios/diseno-web-corporativo` |
| 02 | CRM | Ordena | Cada contacto, conversación y siguiente tarea en el mismo lugar. | `/servicios/crm-aplicaciones-web` |
| 03 | Automatización | Libera | Lo repetitivo se resuelve solo; las decisiones siguen siendo tuyas. | `/servicios/ia-automatizacion` |

Etiqueta accesible de la lista: «Un sistema que trabaja contigo: web, CRM y automatización».

### 2.3 Servicios


- Antetítulo: «Lo que podemos construir juntos».
- H2: «De una web que presenta a un sistema que mueve el negocio.»
- Seis tarjetas (título, beneficio y enlace):

| Título de tarjeta | Beneficio | Enlace |
| --- | --- | --- |
| Webs corporativas | Explica lo que haces, genera confianza y facilita el contacto. | Ver web corporativa |
| Landing pages | Una página diseñada para conseguir una acción concreta. | Ver landing pages |
| Tiendas online | Compra sencilla para el cliente; operación ordenada para tu equipo. | Ver tiendas online |
| Restauración y turismo | Cartas, reservas y pedidos que funcionan bien en el móvil y en el día a día. | Ver soluciones para restauración y turismo |
| CRM y aplicaciones web | Deja de perseguir información entre correos, Excel y WhatsApp. | Ver CRM y aplicaciones web |
| IA y automatización | Menos tareas mecánicas. Más tiempo para atender y decidir bien. | Ver IA y automatización |

### 2.4 IA útil

- Antetítulo: «IA que sirve para algo».
- H2: «Menos promesas sobre IA. Más trabajo resuelto.»
- Párrafo: «Antes de automatizar, entendemos qué tarea se repite, qué información necesita y dónde debe
  intervenir una persona. Después diseñamos una solución que tu equipo pueda entender, supervisar y
  mejorar.»
- Etiqueta del bloque: «Así puede ayudarte».
- Cuatro escenarios:

| Nº | Título | Descripción |
| --- | --- | --- |
| 01 | Responde lo primero | Atiende las dudas repetidas y pasa al equipo una conversación completa, no un mensaje suelto. |
| 02 | Ordena cada solicitud | Clasifica contactos y crea oportunidades con la información que de verdad importa. |
| 03 | Prepara el trabajo | Resume datos y prepara borradores para presupuestos, seguimientos o respuestas. |
| 04 | Reúne lo disperso | Centraliza reservas, consultas y tareas para evitar duplicados y olvidos. |

- Nota destacada: «La IA no decide por tu negocio. Definimos permisos, límites y revisión humana antes
  de ponerla a trabajar.»
- CTA: «Ver soluciones de IA y automatización» → `/servicios/ia-automatizacion`.

### 2.5 Método

- Antetítulo: «Sin cajas negras».
- H2: «Sabes qué vamos a hacer, cuándo y para qué.»
- Intro: «Un buen proyecto no empieza enseñando una pantalla. Empieza entendiendo qué está fallando hoy
  y qué tendría que cambiar mañana.»
- Recuadro: «Antes de empezar tendrás un alcance claro, un calendario realista y responsabilidades por
  escrito.»
- Enlace: «Conoce nuestro proceso» → `/proceso`.

| Nº | Título | Resumen |
| --- | --- | --- |
| 01 | Entendemos | Hablamos de tus clientes, tus objetivos y los puntos donde hoy se atasca el trabajo. |
| 02 | Damos forma | Ordenamos páginas, mensajes, contenidos y recorridos antes de diseñar. |
| 03 | Diseñamos | Convertimos la estrategia en una interfaz clara, reconocible y fácil de usar. |
| 04 | Construimos | Desarrollamos, conectamos y probamos cada pieza antes de publicar. |
| 05 | Medimos y mejoramos | Lanzamos, formamos a tu equipo y priorizamos el siguiente avance. |

### 2.6 Sistemas creados por Nómada

- Antetítulo: «Lo que ocurre cuando las piezas encajan».
- H2: «No hacemos pantallas sueltas. Diseñamos sistemas que se entienden entre sí.»
- Párrafo: «Una web puede ser solo el escaparate o el punto de partida de algo más útil: reservas que
  llegan ordenadas, una tienda conectada con la operación, contactos que no se pierden y tareas que dejan
  de repetirse.»
- Seis piezas, todas con la etiqueta «Concepto»:

| Título | Enlace |
| --- | --- |
| Una web que convierte visitas en conversaciones | Ver web corporativa |
| Un CRM que muestra qué toca hacer ahora | Ver CRM y aplicaciones web |
| Un flujo que quita trabajo repetitivo | Ver IA y automatización |
| Reservas y carta digital sin fricción | Ver soluciones para restauración |
| Una tienda que no complica el back office | Ver tiendas online |
| Una campaña que se puede medir de verdad | Ver landing pages |

- Sello final: «HECHO PARA FUNCIONAR · HECHO CON NÓMADA».
- CTA: «Ver proyectos y casos» → `/proyectos`.
- Nota: «Estas piezas son conceptos de producto. Los casos de clientes se publicarán únicamente con su
  autorización.»

### 2.7 Enfoque local

- Antetítulo: «Cerca, cuando importa».
- H2: «De Jerez para negocios que no quieren quedarse quietos.»
- Párrafo: «Tenemos base en Jerez de la Frontera y entendemos el día a día de quienes viven de atender,
  vender, reservar y cumplir plazos. Podemos sentarnos contigo o trabajar a distancia: lo importante es
  que el proyecto avance.»
- Lista: «Presencial o por videollamada, según lo que te resulte más útil.» · «Experiencia pensada para
  negocios de la provincia de Cádiz.» · «Colaboración remota cuando el proyecto lo pide.»
- Ficha lateral: «36.685° N · 6.126° O» + «Jerez de la Frontera» + «Cádiz».
- Nota interna (no visible): cuando existan páginas diferenciadas, enlazar «Diseño web en Cádiz» y
  «Proyectos en la provincia».

### 2.8 FAQ

- Antetítulo: «Dudas razonables», H2: «Antes de empezar, hablemos claro.»

| Pregunta | Respuesta |
| --- | --- |
| ¿Cuánto cuesta una web? | Depende de lo que tenga que resolver: contenido, funcionalidades, integraciones y complejidad. Tras hablar contigo, recibirás una propuesta con alcance, precio e inclusiones claras. |
| ¿La web será mía? | Sí. Dejamos por escrito quién tiene el dominio, los accesos y los entregables. No construimos dependencias innecesarias. |
| ¿Solo trabajáis en Jerez? | Nuestra base está en Jerez de la Frontera. Trabajamos habitualmente en Cádiz y también a distancia. |
| ¿Incluís SEO? | Toda web nace con una base técnica y de contenidos para que se pueda encontrar. Posicionar de forma sostenida exige después trabajo, contenido útil y autoridad real. |
| ¿Qué puede automatizar la IA? | Lo que tenga sentido: consultas repetidas, clasificación de contactos, resúmenes o preparación de tareas. Primero revisamos el proceso; después decidimos si merece automatizarse. |
| ¿Podré actualizar la web? | Sí. Elegimos un sistema de edición adaptado a tu equipo y te enseñamos a usarlo. |

### 2.9 Conversión

- Antetítulo: «El siguiente paso».
- H2: «Cuéntanos qué te está frenando.»
- Párrafo: «Puede ser una web que ya no representa a tu negocio, contactos que se pierden, una tienda
  difícil de gestionar o demasiado trabajo repetitivo. Cuéntanos el punto de partida; te diremos si
  podemos ayudarte y por dónde empezaríamos.»
- Bloque de contacto directo: «¿Prefieres hablarlo? Llámanos, escríbenos por WhatsApp o reserva una
  conversación.» + enlaces (teléfono, WhatsApp, email, reserva) según los datos reales disponibles.
- Formulario: título «Empezar una conversación» (ver sección 5).

---

## 3. Páginas interiores

### 2.10 Reseñas de Google (home)

- Antetítulo: «Reseñas de Google».
- H2: «Todos los clientes están contentos y lo dicen en Google.»
- Marquesina de dos filas en sentidos opuestos que se pausa al pasar el cursor o al enfocar. Sin
  autoplay en el sentido de interacción: es un desplazamiento continuo decorativo.
- Cada tarjeta: estrellas, texto de la reseña, autor, servicio y etiqueta «Google».
- Mientras no haya reseñas reales, `RESENAS` (`site.config.ts`) contiene marcadores
  `[RESEÑA PENDIENTE]` sin estrellas y el enlace a la ficha muestra el aviso pendiente.
- **No publicar esta sección hasta tener reseñas reales** publicadas y verificables en la ficha de
  Google. No se añade `AggregateRating` ni schema `Review` sin reseñas reales.

### 3.1 `/servicios` (índice)

- Migas: «Inicio / Servicios». Antetítulo: «Servicios».
- H1: «Soluciones para que tu negocio avance sin añadir más caos.»
- Entrada: «No todo el mundo necesita una aplicación a medida. Ni toda web necesita IA. Empezamos por
  entender qué quieres conseguir y te proponemos la combinación que tenga sentido para tu negocio, tu
  equipo y tu momento.»
- Las 6 tarjetas con el mismo texto que en la home.
- Cierre: «¿Tu caso no cabe en una tarjeta? Mejor. Cuéntanoslo y pensamos contigo la forma más útil de
  abordarlo.» + botón «Hablar de mi proyecto».

### 3.2 Fichas de servicio (`/servicios/[slug]`)

Estructura común: migas (Inicio / Servicios / nombre), antetítulo «Servicio», H1 propio, introducción,
listas **Qué incluye**, **Para quién es**, **Cómo lo enfocamos**, botones «[CTA del servicio]» y
«Conoce nuestro proceso», y bloque **Otros servicios** con enlaces «Ver [nombre corto]». Si el slug no
existe: H1 «Ese servicio no existe» + texto de ayuda + botón «Ver todos los servicios» (con `noindex`).

**1. Web corporativa** — `/servicios/diseno-web-corporativo`

- Tarjeta: «Webs corporativas» · Beneficio: «Explica lo que haces, genera confianza y facilita el
  contacto.» · Enlace: «Ver web corporativa» · CTA: «Quiero mejorar mi web»
- H1: «Una web que explica bien lo que haces y consigue que te escriban.»
- Intro: «Tu web suele ser la primera conversación con un posible cliente. Si no entiende rápido qué
  resuelves, por qué elegirte y cómo contactar, esa conversación termina antes de empezar.» / «Por eso no
  empezamos por colores ni plantillas. Ordenamos tu propuesta, tus servicios y el camino que debe seguir
  quien llega con una duda. Después diseñamos y desarrollamos una web rápida, clara y preparada para
  crecer contigo.» / «El resultado no es una web para "estar en internet". Es una herramienta propia para
  generar confianza, captar oportunidades y explicar tu negocio sin que tengas que repetirlo cada día.»
- Qué incluye: arquitectura de páginas y recorrido de contacto · diseño a medida, móvil y accesible ·
  desarrollo rápido y estable · SEO técnico desde el inicio · sistema de edición y formación · medición
  de formularios, llamadas y acciones importantes.
- Para quién es: empresas de servicios que necesitan diferenciarse · negocios con catálogo que quieren
  explicar mejor su oferta · bodegas, turismo y restauración que necesitan una presencia propia a la
  altura de su experiencia.
- Cómo lo enfocamos: entendemos negocio y cliente · ordenamos mensajes y páginas · diseñamos y
  construimos con revisiones concretas · publicamos, medimos y dejamos al equipo preparado.

**2. Landing pages** — `/servicios/landing-pages`

- Tarjeta: «Landing pages» · Beneficio: «Una página diseñada para conseguir una acción concreta.» ·
  Enlace: «Ver landing pages» · CTA: «Crear una landing que funcione»
- H1: «Una campaña no necesita más páginas. Necesita una que convierta.»
- Intro: «Una landing tiene una sola misión: conseguir una acción. Pedir información, reservar,
  descargar, comprar o solicitar una propuesta. Todo lo que no ayuda a esa decisión sobra.» / «Trabajamos
  la promesa, las dudas que frenan y el siguiente paso antes de diseñar. Así el mensaje no se diluye y el
  formulario no recoge contactos sin contexto.» / «Publicamos con la medición preparada para saber qué
  campaña trae oportunidades y qué ocurre después de cada envío.»
- Qué incluye: objetivo y público de campaña · estructura y copy de conversión · formulario útil y
  accesible · conexión con CRM o campañas · medición de conversiones y UTM · pruebas A/B solo si el
  volumen permite aprender.
- Para quién es: equipos que invierten en publicidad · negocios que lanzan una oferta concreta ·
  comerciales que necesitan mejores contactos, no solo más contactos.
- Cómo lo enfocamos: fijamos objetivo y oferta · escribimos antes de diseñar · desarrollamos una página
  ligera · comprobamos datos y ajustamos con uso real.

**3. Tiendas online** — `/servicios/tiendas-online`

- Tarjeta: «Tiendas online» · Beneficio: «Compra sencilla para el cliente; operación ordenada para tu
  equipo.» · Enlace: «Ver tiendas online» · CTA: «Hablar de mi tienda online»
- H1: «Vender online sin convertir tu día a día en un lío.»
- Intro: «Una tienda no acaba en el carrito. Empieza en el catálogo y continúa en el stock, los pagos,
  los envíos, las devoluciones y la atención al cliente.» / «Antes de elegir plataforma, ordenamos cómo
  vendes y cómo preparas cada pedido. Después construimos una compra sencilla para quien visita y una
  operación asumible para quien la gestiona.» / «La tecnología debe quitar problemas, no crear una nueva
  dependencia.»
- Qué incluye: catálogo y fichas que ayudan a comprar · carrito y checkout claros · pagos, envíos,
  impuestos y facturación configurados · conexión con almacén, ERP o transporte cuando procede · SEO de
  categorías y productos · formación para que el equipo pueda gestionar la tienda.
- Para quién es: comercios que quieren vender más allá del horario · productores que quieren un canal
  directo · negocios que ya venden online pero han perdido el control de la operación.
- Cómo lo enfocamos: revisamos surtido y operación · elegimos tecnología por necesidad, no por moda ·
  implantamos por fases · medimos conversión, abandono y preparación de pedidos.

**4. Restauración y turismo** — `/servicios/restauracion-turismo`

- Tarjeta: «Restauración y turismo» · Beneficio: «Cartas, reservas y pedidos que funcionan bien en el
  móvil y en el día a día.» · Enlace: «Ver soluciones para restauración y turismo» · CTA: «Mejorar cartas
  y reservas»
- H1: «Cartas y reservas que no hacen perder tiempo a nadie.»
- Intro: «Una carta que tarda, se lee mal o no está actualizada da trabajo al equipo y mala experiencia
  al cliente. Lo mismo ocurre con reservas que llegan por canales distintos y sin información.» /
  «Diseñamos cartas QR fáciles de consultar, actualizar y entender; y conectamos reservas, pedidos o
  experiencias con el sistema que encaje en tu operación real.» / «Para quien nos visita desde fuera,
  también resolvemos lo práctico: idiomas, horarios, ubicación, accesibilidad y opciones alimentarias.»
- Qué incluye: carta QR editable con alérgenos y disponibilidad · reservas conectadas con tu operativa ·
  pedidos si aportan valor · idiomas bien resueltos · presencia local preparada para búsquedas · medición
  de consulta y uso.
- Para quién es: restaurantes, bares y cafeterías · bodegas y espacios de experiencias · alojamientos que
  necesitan informar y atender mejor.
- Cómo lo enfocamos: entendemos la sala y las horas punta · organizamos contenido con tu equipo ·
  enseñamos a actualizarlo · revisamos uso y ajustamos al primer mes.

**5. CRM y aplicaciones web** — `/servicios/crm-aplicaciones-web`

- Tarjeta: «CRM y aplicaciones web» · Beneficio: «Deja de perseguir información entre correos, Excel y
  WhatsApp.» · Enlace: «Ver CRM y aplicaciones web» · CTA: «Ordenar mi proceso comercial»
- H1: «Que ningún contacto se pierda y cada persona sepa qué hacer.»
- Intro: «Un CRM no arregla un proceso confuso: solo hace más visible el desorden. Por eso empezamos por
  entender cómo entran las oportunidades, quién responde y dónde se pierden las cosas hoy.» / «Adaptamos
  herramientas consolidadas cuando basta con ordenarlas bien. Y cuando no encajan, construimos la
  aplicación que falta y la conectamos con lo que ya usas.» / «El objetivo es sencillo: menos información
  repartida, mejor seguimiento y un equipo que no dependa de la memoria de una sola persona.»
- Qué incluye: mapa de proceso comercial y atención · embudos, campos, tareas, alertas y permisos ·
  aplicaciones a medida cuando la herramienta estándar no basta · conexiones con web, correo, facturación
  o ERP · paneles para decidir · migración y formación por perfiles.
- Para quién es: equipos que pierden seguimiento · empresas con procesos propios · negocios que viven
  entre correos, Excel, WhatsApp y datos duplicados.
- Cómo lo enfocamos: documentamos el proceso real y sus excepciones · decidimos entre adaptar o
  desarrollar · implantamos por fases · acompañamos la adopción con formación y revisión de uso.

**6. IA y automatización** — `/servicios/ia-automatizacion`

- Tarjeta: «IA y automatización» · Beneficio: «Menos tareas mecánicas. Más tiempo para atender y decidir
  bien.» · Enlace: «Ver IA y automatización» · CTA: «Ver qué puedo automatizar»
- H1: «Automatiza lo repetitivo. Conserva el criterio.»
- Intro: «La IA puede ahorrar tiempo, pero no debe añadir incertidumbre. Antes de conectarla, revisamos
  qué tarea se repite, qué datos necesita, qué excepciones existen y quién debe revisar el resultado.» /
  «La usamos cuando hay una ventaja concreta: responder primeras consultas, clasificar solicitudes,
  resumir información o preparar borradores. Si no merece automatizarse, te lo diremos.» / «Todo queda
  definido: qué hace el sistema, qué no puede hacer, qué datos trata y cuándo toma el relevo una persona.»
- Qué incluye: análisis de tareas automatizables · asistentes de primera respuesta · clasificación y
  creación de oportunidades · resúmenes y borradores para trabajo interno · paneles que reúnen
  información · permisos, registro de actividad y revisión humana.
- Para quién es: empresas con consultas repetidas · equipos que preparan la misma información una y otra
  vez · negocios con herramientas que no comparten datos.
- Cómo lo enfocamos: taller de procesos · prueba acotada con criterio de éxito · implantación supervisada ·
  medición de tiempo ahorrado y calidad del resultado.

### 3.3 `/proyectos`

- Migas: Inicio / Proyectos. Antetítulo: «Proyectos».
- H1: «Menos escaparate. Más casos que expliquen qué cambió.»
- Entrada: «Un proyecto solo merece mostrarse si cuenta algo útil: qué problema existía, qué decisión
  tomamos y qué pasó después. Hasta que tengamos casos reales documentados, no rellenaremos esta página
  con adornos.»
- Bloque: «Próximamente: casos reales, con contexto.» + texto «Cada caso explicará el sector y la
  localidad, el punto de partida, la solución creada, las integraciones importantes y los resultados solo
  cuando estén medidos y autorizados.» + nota «Logotipos: solo se publicarán con permiso explícito de
  cada marca.»
- Tres principios: «Trabajo real, no maquetas disfrazadas.» / «Los datos del cliente siguen siendo del
  cliente.» / «El contexto importa más que una captura bonita.», con una línea de apoyo cada uno.
- Cierre: «¿Tienes un problema interesante que resolver? Puede que el próximo caso sea el tuyo.» + botón
  «Contarnos el proyecto».

### 3.4 `/proceso`

- Migas: Inicio / Proceso. Antetítulo: «Proceso».
- H1: «Un proyecto bien llevado no deja dudas en el camino.»
- Entrada: «Sabrás qué vamos a trabajar, qué necesitamos de ti y qué recibirás en cada etapa. Sin fases
  inventadas ni entregas que aparecen al final.»
- Cinco fases, cada una con número, título, resumen, detalle y bloque «Qué te llevas»:

| Nº | Título | Resumen | Qué te llevas |
| --- | --- | --- | --- |
| 01 | Entendemos | Ponemos sobre la mesa objetivos, clientes, proceso actual y prioridades. | Prioridades acordadas · Mapa de proceso · Criterios de éxito |
| 02 | Ordenamos | Convertimos lo aprendido en páginas, mensajes y recorridos claros. | Arquitectura · Mensajes clave · Flujo de conversión |
| 03 | Diseñamos | Probamos la solución antes de construirla. | Prototipo navegable · Sistema visual · Revisión de accesibilidad |
| 04 | Construimos | Desarrollamos, integramos y comprobamos lo importante. | Producto funcional · SEO técnico e integraciones · Informe de rendimiento |
| 05 | Lanzamos y mejoramos | Publicamos con el equipo preparado para continuar. | Checklist de lanzamiento · Formación · Mejoras priorizadas |

- Los párrafos de detalle de cada fase están en `PROCESO` (`site.config.ts`).
- Cierre: «Antes de empezar recibirás alcance, calendario y responsabilidades claros.» + botón «Hablar de
  mi proyecto».

### 3.5 `/recursos`

- Migas: Inicio / Recursos. Antetítulo: «Recursos».
- H1: «Guías para decidir mejor antes de invertir.»
- Entrada: «No queremos llenar un blog por llenar. Publicaremos recursos que te ayuden a hacer mejores
  preguntas, evitar errores caros y entender qué necesita realmente tu negocio.»
- Cuatro tarjetas marcadas como «En preparación»:
  - «Qué automatizar primero (y qué dejar como está)» — Identifica la primera tarea que puede ahorrarte
    tiempo sin crear otro problema.
  - «Cómo elegir CRM sin pagar por funciones que no usarás» — Señales, errores y criterios para elegir con
    sentido.
  - «SEO local en Jerez: qué mueve la aguja de verdad» — Lo que ayuda a que te encuentren sin trucos ni
    listas de ciudades.
  - «La carta digital que tus clientes sí quieren usar» — Velocidad, lectura, alérgenos e idiomas sin
    frustración.
- Cierre: «¿Hay una duda que te está frenando ahora mismo? Pregúntanosla.» + botón «Hacer una consulta».

### 3.6 `/sobre`

- Migas: Inicio / Sobre Nómada Studio. Antetítulo: «Sobre Nómada Studio».
- H1: «Tecnología que se explica. Trabajo que se nota.»
- Párrafos: «Nómada Studio nace para una idea muy concreta: tu negocio no necesita más herramientas si no
  se entienden entre sí. Diseñamos webs, tiendas, procesos internos y automatizaciones para que la parte
  digital te ayude a avanzar, no te dé más trabajo.» / «Tenemos base en Jerez de la Frontera y trabajamos
  con negocios de Cádiz y de cualquier lugar cuando el proyecto encaja. No presumimos de cifras, premios
  ni experiencias que no podamos demostrar. Preferimos que hable el trabajo.»
- Bloque «Cómo trabajamos»: «Primero las palabras, luego las pantallas.» · «Decimos también lo que no
  hace falta.» · «Cada herramienta tiene que justificar su sitio.» · «Tus datos y tus accesos son tuyos.»
  (textos de apoyo en `sobre.page.ts`).
- Bloque «Ficha del estudio»: nota «Estos campos se completan con datos reales antes de publicar...» +
  campos con marcadores pendientes (razón social, inicio de actividad, equipo, dirección, email,
  teléfono).
- Cierre: «Si esta forma de trabajar te encaja, cuéntanos qué quieres mejorar.» + botón «Hablemos de tu
  proyecto».

### 3.7 `/contacto`

- Migas: Inicio / Contacto. Antetítulo: «Contacto».
- H1: «Cuéntanos qué no está funcionando.»
- Entrada: «No hace falta que llegues con una solución cerrada. Dinos qué quieres mejorar —una web que no
  convierte, contactos desordenados, ventas online, reservas o trabajo repetitivo— y vemos contigo cuál
  puede ser el siguiente paso.»
- Tres pasos: «Te respondemos» (En [PLAZO REAL], con las primeras preguntas o una propuesta para hablar.)
  · «Entendemos el contexto» (En una reunión presencial o por videollamada, revisamos objetivos, plazos y
  prioridades.) · «Recibes una propuesta clara» (Si encaja, te enviamos alcance, calendario,
  responsabilidades y lo que queda fuera.)
- Contacto directo: «¿Prefieres hablarlo? Estamos en Jerez de la Frontera y podemos reunirnos en persona
  o por videollamada.»
- Formulario con el título «Empezar una conversación» (mismos campos que en la home).

### 3.8 Páginas legales

Cuatro documentos, todos en `legal.page.ts`, con aviso visible de borrador: «Este texto es una base de
trabajo, no un documento legal cerrado. Antes de publicar debe revisarlo una persona especializada y
sustituirse todos los campos [DATO PENDIENTE].»

| Ruta | Título | Secciones |
| --- | --- | --- |
| `/aviso-legal` | Aviso legal | Titular del sitio · Objeto · Propiedad intelectual e industrial · Responsabilidad · Legislación aplicable |
| `/privacidad` | Política de privacidad | Responsable del tratamiento · Qué datos tratamos y para qué · Base jurídica · Cuánto tiempo los conservamos · Destinatarios · Derechos · Analítica |
| `/cookies` | Política de cookies | Qué son y qué usamos · Cómo cambiar tu decisión (+ botón «Volver a decidir sobre la analítica») |
| `/accesibilidad` | Declaración de accesibilidad | Compromiso · Medidas aplicadas · Barreras conocidas · Contacto |

Los textos completos están en `legal.page.ts` y contienen `[DATO PENDIENTE]` / `[RAZÓN SOCIAL
PENDIENTE]` que deben sustituirse antes de publicar.

### 3.9 404

- Antetítulo: «Error 404». H1: «Aquí no hay nada. Pero podemos llevarte a donde sí.»
- Texto: «Puede que el enlace haya cambiado, esté mal escrito o que esta página todavía no exista. Elige
  por dónde seguir.»
- Botones: «Ver servicios», «Conocer el proceso», «Ver proyectos», «Contactar».

---

## 4. Metadatos SEO (títulos y descripciones)

Solo se listan las rutas reformuladas; el resto mantiene su metadato actual. La canónica se genera en
cada `*.page.ts` con `SeoService`.

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
| `/contacto` | Contacto \| Nómada Studio, Jerez | Cuéntanos qué quieres mejorar en tu web, ventas, reservas o procesos internos. Te respondemos en [PLAZO REAL]. |

Proyectos, proceso, recursos, sobre y legales conservan sus títulos actuales.

---

## 5. Mensajes del sistema (formulario y avisos)

**Campos y etiquetas**

| Campo | Etiqueta | Ayuda | Error |
| --- | --- | --- | --- |
| Nombre | «Tu nombre *» | — | «Escribe tu nombre para saber cómo dirigirnos a ti.» |
| Empresa | «Empresa o proyecto *» | — | «Indica el nombre de tu empresa o proyecto.» |
| Email | «Tu email *» | — | «Revisa el email: parece que falta algo.» |
| Teléfono | «Teléfono, si prefieres que te llamemos» | — | «Revisa el número de teléfono.» |
| Mensaje | «¿Qué te gustaría mejorar? *» | «Cuéntanos qué está pasando ahora y qué te gustaría que cambiara. No hace falta que tengas la solución pensada.» | «Cuéntanos al menos un poco qué necesitas.» |
| Presupuesto | «Presupuesto aproximado, si lo tienes» | «Puedes indicarnos un rango o decirnos que todavía no lo tienes claro.» | — |
| Consentimiento | «Acepto que Nómada Studio use mis datos para responder a esta consulta.» | — | «Necesitamos tu consentimiento para poder responderte.» |

**Botón y nota legal**: «Enviar consulta» (muestra «Enviando tu mensaje…» durante el envío) · «Usaremos
estos datos solo para responderte. Consulta nuestra Política de privacidad.»

**Estados de envío**

- Correcto: «Recibido. Te responderemos en [PLAZO REAL].»
- Sin endpoint configurado: «Tu mensaje está listo en el correo. Envíalo y te responderemos en
  [PLAZO REAL].»
- Error: «No hemos podido enviarlo ahora. Prueba de nuevo en unos minutos, o escríbenos directamente a
  [email].»

---

## 6. Estructura de encabezados por página

| Página | H1 | H2 principales |
| --- | --- | --- |
| Inicio | Tu web debería traerte clientes, no más trabajo. | Si tu negocio crece, tus herramientas tienen que acompañarlo. · De una web que presenta a un sistema que mueve el negocio. · Menos promesas sobre IA. Más trabajo resuelto. · Sabes qué vamos a hacer, cuándo y para qué. · No hacemos pantallas sueltas… · De Jerez para negocios que no quieren quedarse quietos. · Antes de empezar, hablemos claro. · Cuéntanos qué te está frenando. |
| Servicios | Soluciones para que tu negocio avance sin añadir más caos. | (tarjetas de servicio) |
| Ficha de servicio | `<H1 del servicio>` | Qué incluye · Para quién es · Cómo lo enfocamos · Otros servicios |
| Proyectos | Menos escaparate. Más casos que expliquen qué cambió. | (principios) |
| Proceso | Un proyecto bien llevado no deja dudas en el camino. | (una por fase) |
| Recursos | Guías para decidir mejor antes de invertir. | (una por guía) |
| Sobre | Tecnología que se explica. Trabajo que se nota. | Cómo trabajamos · Ficha del estudio |
| Contacto | Cuéntanos qué no está funcionando. | (los tres pasos y el formulario) |
| Legales | `<Título del documento>` | (una por sección) |
| 404 | Aquí no hay nada. Pero podemos llevarte a donde sí. | — |

Regla: un único H1 por página y jerarquía sin saltos (H1 → H2 → H3). Las etiquetas de sección son
párrafos con estilo, no encabezados, para no interferir en la jerarquía.

---

## 7. Textos con marcadores pendientes

| Marcador | Dónde aparece |
| --- | --- |
| `[RAZÓN SOCIAL PENDIENTE]` | Aviso legal, ficha de `/sobre`, datos estructurados |
| `[DIRECCIÓN REAL]` | Pie de página (solo si es real), aviso legal, ficha de `/sobre` |
| `[PLAZO REAL]` | Hero (microconfianza), formulario, paso 1 de `/contacto`, metadatos de `/contacto` |
| `[DATO PENDIENTE]` | Email, teléfono, WhatsApp, código postal, horario, ficha de `/sobre`, páginas legales |

Mientras un dato siga pendiente: no se generan los enlaces de teléfono/WhatsApp/email, las páginas
legales lo advierten y los datos estructurados omiten el campo.

---

## 8. Reglas de estilo del texto

1. Español de España, voz directa, cercana y segura; se tutea a la persona.
2. El texto empieza por lo que hoy le cuesta al cliente (contactos perdidos, procesos lentos, una web que
   no explica ni convierte) y muestra una salida concreta. Frases breves, sin grandilocuencia.
3. Sin clichés («soluciones innovadoras», «llevamos tu negocio al siguiente nivel») ni promesas que no se
   puedan cumplir.
4. Nunca se inventan datos: años, cifras, clientes, premios, reseñas o precios. Si falta, se usa un
   marcador pendiente.
5. «Jerez» y «Cádiz» aparecen solo cuando aportan contexto real, nunca como lista de localidades.
6. La IA se explica con casos de uso, límites, revisión humana y datos; no sustituye a las personas.
7. Los enlaces son descriptivos («Ver web corporativa»), nunca «Saber más» o «Haz clic aquí».
8. Se conservan sin cambios las etiquetas accesibles, migas de pan, avisos legales, política de cookies y
   el aviso de borrador legal: informan, no venden.
