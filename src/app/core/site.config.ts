/**
 * CONFIGURACIÓN CENTRAL DEL SITIO
 * ---------------------------------------------------------------------------
 * Única fuente de verdad para datos de empresa, textos reutilizados y SEO.
 *
 * REGLA: todo valor marcado como [DATO PENDIENTE] / [PLAZO REAL] /
 * [DIRECCIÓN REAL] debe sustituirse por información real antes de publicar.
 * El schema JSON-LD omite automáticamente los campos que sigan pendientes.
 */

export const PENDIENTE = '[DATO PENDIENTE]';
export const PLAZO_PENDIENTE = '[PLAZO REAL]';
export const DIRECCION_PENDIENTE = '[DIRECCIÓN REAL]';

export const SITE = {
  marca: 'Nómada Studio',
  razonSocial: '[RAZÓN SOCIAL PENDIENTE]',
  dominio: 'https://www.nomadastudio.es',
  email: 'test@test.com',
  telefono: PENDIENTE,
  whatsapp: '+34 000000000',
  direccion: DIRECCION_PENDIENTE,
  ciudad: 'Jerez de la Frontera',
  provincia: 'Cádiz',
  pais: 'ES',
  codigoPostal: PENDIENTE,
  horario: PENDIENTE,
  googleMaps: '', // URL real de Google Maps cuando exista dirección pública
  redes: {
    instagram: '', // URL real
    linkedin: '', // URL real
    github: '', // URL real
  },
  plazoRespuesta: PLAZO_PENDIENTE,
  formEndpoint: PENDIENTE, // endpoint real (CRM, correo transaccional o API propia)
  bookingUrl: '', // URL real de reserva de reunión (Cal.com, Calendly u otra)
  ga4Id: PENDIENTE, // ID de GA4 cuando exista consentimiento y propiedad real
  googleReviews: '', // URL pública de la ficha de reseñas de Google
  valoracionGoogle: PENDIENTE, // p. ej. «5,0 · 27 reseñas» cuando sea real
} as const;

export const esDatoPendiente = (valor: string): boolean =>
  !valor || valor.includes('PENDIENTE') || valor.includes('[PLAZO REAL]') || valor.includes('[DIRECCIÓN REAL]');

export const urlAbsoluta = (ruta: string): string =>
  `${SITE.dominio}${ruta.startsWith('/') ? ruta : `/${ruta}`}`;

export interface EnlaceNav {
  etiqueta: string;
  ruta: string;
  descripcion?: string;
}

export interface GrupoNav {
  etiqueta: string;
  ruta: string;
  hijos?: EnlaceNav[];
}

export const NAVEGACION: GrupoNav[] = [
  {
    etiqueta: 'Servicios',
    ruta: '/servicios',
    hijos: [
      { etiqueta: 'Web corporativa', ruta: '/servicios/diseno-web-corporativo', descripcion: 'Que te entiendan y contacten contigo.' },
      { etiqueta: 'Landing pages', ruta: '/servicios/landing-pages', descripcion: 'Una campaña, un objetivo, menos distracciones.' },
      { etiqueta: 'Tiendas online', ruta: '/servicios/tiendas-online', descripcion: 'Vender sin complicar la operación.' },
      { etiqueta: 'Restauración y turismo', ruta: '/servicios/restauracion-turismo', descripcion: 'Cartas, reservas y experiencias que sí se usan.' },
      { etiqueta: 'CRM y aplicaciones web', ruta: '/servicios/crm-aplicaciones-web', descripcion: 'Menos caos. Cada contacto en su sitio.' },
      { etiqueta: 'IA y automatización', ruta: '/servicios/ia-automatizacion', descripcion: 'Quita trabajo repetitivo sin perder el control.' },
    ],
  },
  { etiqueta: 'Proyectos', ruta: '/proyectos' },
  { etiqueta: 'Cómo trabajamos', ruta: '/proceso' },
  { etiqueta: 'Recursos útiles', ruta: '/recursos' },
  { etiqueta: `Sobre ${SITE.marca}`, ruta: '/sobre' },
  { etiqueta: 'Contacto', ruta: '/contacto' },
];

export interface Servicio {
  slug: string;
  nombre: string;
  tituloTarjeta: string;
  beneficio: string;
  enlace: string;
  cta: string;
  icono: 'browser' | 'target' | 'cart' | 'utensils' | 'layers' | 'spark';
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  incluye: string[];
  paraQuien: string[];
  enfoque: string[];
}

export const SERVICIOS: Servicio[] = [
  {
    slug: 'diseno-web-corporativo',
    nombre: 'Web corporativa',
    tituloTarjeta: 'Webs corporativas',
    beneficio: 'Explica lo que haces, genera confianza y facilita el contacto.',
    enlace: 'web corporativa',
    cta: 'Quiero mejorar mi web',
    icono: 'browser',
    h1: 'Una web que explica bien lo que haces y consigue que te escriban.',
    metaTitle: `Diseño web corporativo en Jerez | ${SITE.marca}`,
    metaDescription:
      'Una web clara, rápida y preparada para que te encuentren, entiendan tu propuesta y contacten contigo.',
    intro: [
      'Tu web suele ser la primera conversación con un posible cliente. Si no entiende rápido qué resuelves, por qué elegirte y cómo contactar, esa conversación termina antes de empezar.',
      'Por eso no empezamos por colores ni plantillas. Ordenamos tu propuesta, tus servicios y el camino que debe seguir quien llega con una duda. Después diseñamos y desarrollamos una web rápida, clara y preparada para crecer contigo.',
      'El resultado no es una web para “estar en internet”. Es una herramienta propia para generar confianza, captar oportunidades y explicar tu negocio sin que tengas que repetirlo cada día.',
    ],
    incluye: [
      'Arquitectura de páginas y recorrido de contacto',
      'Diseño a medida, móvil y accesible',
      'Desarrollo rápido y estable',
      'SEO técnico desde el inicio',
      'Sistema de edición y formación',
      'Medición de formularios, llamadas y acciones importantes',
    ],
    paraQuien: [
      'Empresas de servicios que necesitan diferenciarse',
      'Negocios con catálogo que quieren explicar mejor su oferta',
      'Bodegas, turismo y restauración que necesitan una presencia propia a la altura de su experiencia',
    ],
    enfoque: [
      'Entendemos negocio y cliente',
      'Ordenamos mensajes y páginas',
      'Diseñamos y construimos con revisiones concretas',
      'Publicamos, medimos y dejamos al equipo preparado',
    ],
  },
  {
    slug: 'landing-pages',
    nombre: 'Landing pages',
    tituloTarjeta: 'Landing pages',
    beneficio: 'Una página diseñada para conseguir una acción concreta.',
    enlace: 'landing pages',
    cta: 'Crear una landing que funcione',
    icono: 'target',
    h1: 'Una campaña no necesita más páginas. Necesita una que convierta.',
    metaTitle: `Landing pages que convierten | ${SITE.marca}`,
    metaDescription:
      'Páginas de campaña claras, rápidas y medibles para generar oportunidades con más contexto.',
    intro: [
      'Una landing tiene una sola misión: conseguir una acción. Pedir información, reservar, descargar, comprar o solicitar una propuesta. Todo lo que no ayuda a esa decisión sobra.',
      'Trabajamos la promesa, las dudas que frenan y el siguiente paso antes de diseñar. Así el mensaje no se diluye y el formulario no recoge contactos sin contexto.',
      'Publicamos con la medición preparada para saber qué campaña trae oportunidades y qué ocurre después de cada envío.',
    ],
    incluye: [
      'Objetivo y público de campaña',
      'Estructura y copy de conversión',
      'Formulario útil y accesible',
      'Conexión con CRM o campañas',
      'Medición de conversiones y UTM',
      'Pruebas A/B solo si el volumen permite aprender',
    ],
    paraQuien: [
      'Equipos que invierten en publicidad',
      'Negocios que lanzan una oferta concreta',
      'Comerciales que necesitan mejores contactos, no solo más contactos',
    ],
    enfoque: [
      'Fijamos objetivo y oferta',
      'Escribimos antes de diseñar',
      'Desarrollamos una página ligera',
      'Comprobamos datos y ajustamos con uso real',
    ],
  },
  {
    slug: 'tiendas-online',
    nombre: 'Tiendas online',
    tituloTarjeta: 'Tiendas online',
    beneficio: 'Compra sencilla para el cliente; operación ordenada para tu equipo.',
    enlace: 'tiendas online',
    cta: 'Hablar de mi tienda online',
    icono: 'cart',
    h1: 'Vender online sin convertir tu día a día en un lío.',
    metaTitle: `Tiendas online en Jerez y Cádiz | ${SITE.marca}`,
    metaDescription:
      'Ecommerce pensado para vender con facilidad y ordenar catálogo, pedidos y operación.',
    intro: [
      'Una tienda no acaba en el carrito. Empieza en el catálogo y continúa en el stock, los pagos, los envíos, las devoluciones y la atención al cliente.',
      'Antes de elegir plataforma, ordenamos cómo vendes y cómo preparas cada pedido. Después construimos una compra sencilla para quien visita y una operación asumible para quien la gestiona.',
      'La tecnología debe quitar problemas, no crear una nueva dependencia.',
    ],
    incluye: [
      'Catálogo y fichas que ayudan a comprar',
      'Carrito y checkout claros',
      'Pagos, envíos, impuestos y facturación configurados',
      'Conexión con almacén, ERP o transporte cuando procede',
      'SEO de categorías y productos',
      'Formación para que el equipo pueda gestionar la tienda',
    ],
    paraQuien: [
      'Comercios que quieren vender más allá del horario',
      'Productores que quieren un canal directo',
      'Negocios que ya venden online pero han perdido el control de la operación',
    ],
    enfoque: [
      'Revisamos surtido y operación',
      'Elegimos tecnología por necesidad, no por moda',
      'Implantamos por fases',
      'Medimos conversión, abandono y preparación de pedidos',
    ],
  },
  {
    slug: 'restauracion-turismo',
    nombre: 'Restauración y turismo',
    tituloTarjeta: 'Restauración y turismo',
    beneficio: 'Cartas, reservas y pedidos que funcionan bien en el móvil y en el día a día.',
    enlace: 'soluciones para restauración y turismo',
    cta: 'Mejorar cartas y reservas',
    icono: 'utensils',
    h1: 'Cartas y reservas que no hacen perder tiempo a nadie.',
    metaTitle: `Cartas digitales y reservas | ${SITE.marca}`,
    metaDescription:
      'Cartas QR, reservas y pedidos para restauración y turismo: rápidos, claros y fáciles de actualizar.',
    intro: [
      'Una carta que tarda, se lee mal o no está actualizada da trabajo al equipo y mala experiencia al cliente. Lo mismo ocurre con reservas que llegan por canales distintos y sin información.',
      'Diseñamos cartas QR fáciles de consultar, actualizar y entender; y conectamos reservas, pedidos o experiencias con el sistema que encaje en tu operación real.',
      'Para quien nos visita desde fuera, también resolvemos lo práctico: idiomas, horarios, ubicación, accesibilidad y opciones alimentarias.',
    ],
    incluye: [
      'Carta QR editable con alérgenos y disponibilidad',
      'Reservas conectadas con tu operativa',
      'Pedidos si aportan valor',
      'Idiomas bien resueltos',
      'Presencia local preparada para búsquedas',
      'Medición de consulta y uso',
    ],
    paraQuien: [
      'Restaurantes, bares y cafeterías',
      'Bodegas y espacios de experiencias',
      'Alojamientos que necesitan informar y atender mejor',
    ],
    enfoque: [
      'Entendemos la sala y las horas punta',
      'Organizamos contenido con tu equipo',
      'Enseñamos a actualizarlo',
      'Revisamos uso y ajustamos al primer mes',
    ],
  },
  {
    slug: 'crm-aplicaciones-web',
    nombre: 'CRM y aplicaciones web',
    tituloTarjeta: 'CRM y aplicaciones web',
    beneficio: 'Deja de perseguir información entre correos, Excel y WhatsApp.',
    enlace: 'CRM y aplicaciones web',
    cta: 'Ordenar mi proceso comercial',
    icono: 'layers',
    h1: 'Que ningún contacto se pierda y cada persona sepa qué hacer.',
    metaTitle: `CRM y aplicaciones web para empresas | ${SITE.marca}`,
    metaDescription:
      'Ordena contactos, tareas y datos con CRM e instrumentos digitales adaptados a tu proceso.',
    intro: [
      'Un CRM no arregla un proceso confuso: solo hace más visible el desorden. Por eso empezamos por entender cómo entran las oportunidades, quién responde y dónde se pierden las cosas hoy.',
      'Adaptamos herramientas consolidadas cuando basta con ordenarlas bien. Y cuando no encajan, construimos la aplicación que falta y la conectamos con lo que ya usas.',
      'El objetivo es sencillo: menos información repartida, mejor seguimiento y un equipo que no dependa de la memoria de una sola persona.',
    ],
    incluye: [
      'Mapa de proceso comercial y atención',
      'Embudos, campos, tareas, alertas y permisos',
      'Aplicaciones a medida cuando la herramienta estándar no basta',
      'Conexiones con web, correo, facturación o ERP',
      'Paneles para decidir',
      'Migración y formación por perfiles',
    ],
    paraQuien: [
      'Equipos que pierden seguimiento',
      'Empresas con procesos propios',
      'Negocios que viven entre correos, Excel, WhatsApp y datos duplicados',
    ],
    enfoque: [
      'Documentamos el proceso real y sus excepciones',
      'Decidimos entre adaptar o desarrollar',
      'Implantamos por fases',
      'Acompañamos la adopción con formación y revisión de uso',
    ],
  },
  {
    slug: 'ia-automatizacion',
    nombre: 'IA y automatización',
    tituloTarjeta: 'IA y automatización',
    beneficio: 'Menos tareas mecánicas. Más tiempo para atender y decidir bien.',
    enlace: 'IA y automatización',
    cta: 'Ver qué puedo automatizar',
    icono: 'spark',
    h1: 'Automatiza lo repetitivo. Conserva el criterio.',
    metaTitle: `IA y automatización para empresas | ${SITE.marca}`,
    metaDescription:
      'Automatiza tareas repetitivas con reglas claras, supervisión humana y datos bien conectados.',
    intro: [
      'La IA puede ahorrar tiempo, pero no debe añadir incertidumbre. Antes de conectarla, revisamos qué tarea se repite, qué datos necesita, qué excepciones existen y quién debe revisar el resultado.',
      'La usamos cuando hay una ventaja concreta: responder primeras consultas, clasificar solicitudes, resumir información o preparar borradores. Si no merece automatizarse, te lo diremos.',
      'Todo queda definido: qué hace el sistema, qué no puede hacer, qué datos trata y cuándo toma el relevo una persona.',
    ],
    incluye: [
      'Análisis de tareas automatizables',
      'Asistentes de primera respuesta',
      'Clasificación y creación de oportunidades',
      'Resúmenes y borradores para trabajo interno',
      'Paneles que reúnen información',
      'Permisos, registro de actividad y revisión humana',
    ],
    paraQuien: [
      'Empresas con consultas repetidas',
      'Equipos que preparan la misma información una y otra vez',
      'Negocios con herramientas que no comparten datos',
    ],
    enfoque: [
      'Taller de procesos',
      'Prueba acotada con criterio de éxito',
      'Implantación supervisada',
      'Medición de tiempo ahorrado y calidad del resultado',
    ],
  },
];

export const obtenerServicio = (slug: string): Servicio | undefined =>
  SERVICIOS.find((servicio) => servicio.slug === slug);

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export const FAQS: PreguntaFrecuente[] = [
  {
    pregunta: '¿Cuánto cuesta una web?',
    respuesta:
      'Depende de lo que tenga que resolver: contenido, funcionalidades, integraciones y complejidad. Tras hablar contigo, recibirás una propuesta con alcance, precio e inclusiones claras.',
  },
  {
    pregunta: '¿La web será mía?',
    respuesta:
      'Sí. Dejamos por escrito quién tiene el dominio, los accesos y los entregables. No construimos dependencias innecesarias.',
  },
  {
    pregunta: '¿Solo trabajáis en Jerez?',
    respuesta:
      'Nuestra base está en Jerez de la Frontera. Trabajamos habitualmente en Cádiz y también a distancia.',
  },
  {
    pregunta: '¿Incluís SEO?',
    respuesta:
      'Toda web nace con una base técnica y de contenidos para que se pueda encontrar. Posicionar de forma sostenida exige después trabajo, contenido útil y autoridad real.',
  },
  {
    pregunta: '¿Qué puede automatizar la IA?',
    respuesta:
      'Lo que tenga sentido: consultas repetidas, clasificación de contactos, resúmenes o preparación de tareas. Primero revisamos el proceso; después decidimos si merece automatizarse.',
  },
  {
    pregunta: '¿Podré actualizar la web?',
    respuesta: 'Sí. Elegimos un sistema de edición adaptado a tu equipo y te enseñamos a usarlo.',
  },
];

export interface PasoProceso {
  numero: string;
  titulo: string;
  resumen: string;
  detalle: string;
  entregables: string[];
}

/** Fases completas de la página /proceso. */
export const PROCESO: PasoProceso[] = [
  {
    numero: '01',
    titulo: 'Entendemos',
    resumen: 'Ponemos sobre la mesa objetivos, clientes, proceso actual y prioridades.',
    detalle:
      'Escuchamos cómo funciona hoy el negocio: quién atiende, qué se repite, dónde se pierde información y qué decisión depende del proyecto. Sin esta parte, cualquier propuesta es adivinación.',
    entregables: ['Prioridades acordadas', 'Mapa de proceso', 'Criterios de éxito'],
  },
  {
    numero: '02',
    titulo: 'Ordenamos',
    resumen: 'Convertimos lo aprendido en páginas, mensajes y recorridos claros.',
    detalle:
      'Antes de diseñar pantallas, decidimos qué páginas existen, qué dice cada una, en qué orden y hacia qué acción llevan. Aquí se resuelven la mayoría de los problemas de una web.',
    entregables: ['Arquitectura', 'Mensajes clave', 'Flujo de conversión'],
  },
  {
    numero: '03',
    titulo: 'Diseñamos',
    resumen: 'Probamos la solución antes de construirla.',
    detalle:
      'Diseñamos con contenido real, no con textos de relleno. El prototipo permite probar jerarquía, navegación y accesibilidad antes de invertir horas de desarrollo.',
    entregables: ['Prototipo navegable', 'Sistema visual', 'Revisión de accesibilidad'],
  },
  {
    numero: '04',
    titulo: 'Construimos',
    resumen: 'Desarrollamos, integramos y comprobamos lo importante.',
    detalle:
      'Construimos cuidando peso, semántica y tiempos de carga, con pruebas en móvil real. Las integraciones se verifican con datos de prueba antes de conectar producción.',
    entregables: ['Producto funcional', 'SEO técnico e integraciones', 'Informe de rendimiento'],
  },
  {
    numero: '05',
    titulo: 'Lanzamos y mejoramos',
    resumen: 'Publicamos con el equipo preparado para continuar.',
    detalle:
      'Publicamos con checklist, formamos a las personas que van a mantener el sistema y dejamos la medición en marcha. La primera iteración se decide con datos, no con opiniones.',
    entregables: ['Checklist de lanzamiento', 'Formación', 'Mejoras priorizadas'],
  },
];

export interface PasoMetodo {
  numero: string;
  titulo: string;
  resumen: string;
}

/** Resumen de pasos que se muestra en la home. */
export const PASOS_METODO: PasoMetodo[] = [
  {
    numero: '01',
    titulo: 'Entendemos',
    resumen: 'Hablamos de tus clientes, tus objetivos y los puntos donde hoy se atasca el trabajo.',
  },
  {
    numero: '02',
    titulo: 'Damos forma',
    resumen: 'Ordenamos páginas, mensajes, contenidos y recorridos antes de diseñar.',
  },
  {
    numero: '03',
    titulo: 'Diseñamos',
    resumen: 'Convertimos la estrategia en una interfaz clara, reconocible y fácil de usar.',
  },
  {
    numero: '04',
    titulo: 'Construimos',
    resumen: 'Desarrollamos, conectamos y probamos cada pieza antes de publicar.',
  },
  {
    numero: '05',
    titulo: 'Medimos y mejoramos',
    resumen: 'Lanzamos, formamos a tu equipo y priorizamos el siguiente avance.',
  },
];

export interface EscenarioIa {
  titulo: string;
  descripcion: string;
}

export const ESCENARIOS_IA: EscenarioIa[] = [
  {
    titulo: 'Responde lo primero',
    descripcion:
      'Atiende las dudas repetidas y pasa al equipo una conversación completa, no un mensaje suelto.',
  },
  {
    titulo: 'Ordena cada solicitud',
    descripcion: 'Clasifica contactos y crea oportunidades con la información que de verdad importa.',
  },
  {
    titulo: 'Prepara el trabajo',
    descripcion:
      'Resume datos y prepara borradores para presupuestos, seguimientos o respuestas.',
  },
  {
    titulo: 'Reúne lo disperso',
    descripcion: 'Centraliza reservas, consultas y tareas para evitar duplicados y olvidos.',
  },
];

export const NOTA_IA =
  'La IA no decide por tu negocio. Definimos permisos, límites y revisión humana antes de ponerla a trabajar.';

export interface EventoConversion {
  nombre: string;
  descripcion: string;
}

export const EVENTOS_CONVERSION: EventoConversion[] = [
  { nombre: 'contact_form_submit', descripcion: 'Envío correcto del formulario de contacto.' },
  { nombre: 'phone_click', descripcion: 'Clic en un número de teléfono.' },
  { nombre: 'whatsapp_click', descripcion: 'Clic en un enlace de WhatsApp.' },
  { nombre: 'chatbot_open', descripcion: 'Apertura del asistente de contacto.' },
  { nombre: 'chatbot_email_click', descripcion: 'Clic en el correo del asistente de contacto.' },
  { nombre: 'meeting_book', descripcion: 'Clic para reservar una reunión.' },
];

export interface Resena {
  texto: string;
  autor: string;
  servicio: string;
  estrellas: number;
}

/**
 * Reseñas de Google para la home.
 *
 * IMPORTANTE: sustituir cada elemento por una reseña real publicada en la ficha
 * de Google de Nómada Studio antes de publicar la sección. Los textos marcados
 * como [RESEÑA PENDIENTE] son marcadores, no opiniones.
 */
export const RESENAS: Resena[] = [
  {
    texto: '[RESEÑA PENDIENTE: pega aquí una reseña real de Google]',
    autor: '[NOMBRE DEL CLIENTE]',
    servicio: '[SERVICIO]',
    estrellas: 0,
  },
  {
    texto: '[RESEÑA PENDIENTE: pega aquí una reseña real de Google]',
    autor: '[NOMBRE DEL CLIENTE]',
    servicio: '[SERVICIO]',
    estrellas: 0,
  },
  {
    texto: '[RESEÑA PENDIENTE: pega aquí una reseña real de Google]',
    autor: '[NOMBRE DEL CLIENTE]',
    servicio: '[SERVICIO]',
    estrellas: 0,
  },
  {
    texto: '[RESEÑA PENDIENTE: pega aquí una reseña real de Google]',
    autor: '[NOMBRE DEL CLIENTE]',
    servicio: '[SERVICIO]',
    estrellas: 0,
  },
];
