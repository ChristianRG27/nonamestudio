import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchemaService } from '../../core/schema.service';
import { SeoService } from '../../core/seo.service';
import { ConsentService } from '../../core/consent.service';
import { SITE, urlAbsoluta } from '../../core/site.config';

interface BloqueLegal {
  titulo: string;
  parrafos: string[];
  lista?: string[];
}

interface DocumentoLegal {
  titulo: string;
  descripcion: string;
  bloques: BloqueLegal[];
}

const CLAVES = ['aviso-legal', 'privacidad', 'cookies', 'accesibilidad'] as const;
type ClaveLegal = (typeof CLAVES)[number];

const esClaveLegal = (valor: string): valor is ClaveLegal =>
  (CLAVES as readonly string[]).includes(valor);

export const NOTA_BORRADOR =
  'Este texto es una base de trabajo, no un documento legal cerrado. Antes de publicar debe revisarlo una persona especializada y sustituirse todos los campos [DATO PENDIENTE].';

const DOCUMENTOS: Record<ClaveLegal, DocumentoLegal> = {
  'aviso-legal': {
    titulo: 'Aviso legal',
    descripcion: `Información legal del sitio web de ${SITE.marca}.`,
    bloques: [
      {
        titulo: 'Titular del sitio',
        parrafos: [
          'En cumplimiento de la normativa de servicios de la sociedad de la información, se informa de que este sitio web pertenece a:',
        ],
        lista: [
          `Razón social: ${SITE.razonSocial}`,
          'NIF: [DATO PENDIENTE]',
          `Dirección: ${SITE.direccion}`,
          `Email: ${SITE.email}`,
          `Teléfono: ${SITE.telefono}`,
        ],
      },
      {
        titulo: 'Objeto',
        parrafos: [
          `Este sitio presenta los servicios de diseño y desarrollo web, tiendas online, CRM y automatización de ${SITE.marca}. La información publicada es de carácter general y no constituye una oferta vinculante hasta que exista un acuerdo por escrito entre las partes.`,
        ],
      },
      {
        titulo: 'Propiedad intelectual e industrial',
        parrafos: [
          'Los textos, el diseño, el código y los elementos gráficos de este sitio pertenecen a su titular o se utilizan con autorización. No se permite su reproducción total o parcial sin consentimiento previo por escrito.',
        ],
      },
      {
        titulo: 'Responsabilidad',
        parrafos: [
          'El titular no garantiza la disponibilidad ininterrumpida del sitio ni la ausencia de errores, aunque trabaja para evitarlos. Los enlaces a sitios de terceros se ofrecen como referencia y no implican responsabilidad sobre sus contenidos.',
        ],
      },
      {
        titulo: 'Legislación aplicable',
        parrafos: [
          'La relación entre el titular y las personas usuarias se rige por la legislación española. Cualquier controversia se someterá a los juzgados y tribunales que correspondan según la normativa aplicable.',
        ],
      },
    ],
  },
  privacidad: {
    titulo: 'Política de privacidad',
    descripcion: `Cómo trata ${SITE.marca} los datos personales que recibe a través de este sitio.`,
    bloques: [
      {
        titulo: 'Responsable del tratamiento',
        parrafos: [
          `El responsable del tratamiento de los datos recogidos en este sitio es ${SITE.razonSocial}, con dirección en ${SITE.direccion} y email de contacto ${SITE.email}.`,
        ],
      },
      {
        titulo: 'Qué datos tratamos y para qué',
        parrafos: [
          'Tratamos los datos que envías voluntariamente a través del formulario de contacto (nombre, empresa, email, teléfono opcional y el contenido de tu mensaje) con la única finalidad de responder a tu solicitud y, si se avanza, preparar una propuesta.',
          'No usamos estos datos para enviarte comunicaciones comerciales que no hayas pedido.',
        ],
      },
      {
        titulo: 'Base jurídica',
        parrafos: [
          'La base legal es tu consentimiento, que otorgas al marcar la casilla de privacidad antes de enviar el formulario. Puedes retirarlo en cualquier momento escribiéndonos.',
        ],
      },
      {
        titulo: 'Cuánto tiempo los conservamos',
        parrafos: [
          'Conservamos los datos durante el tiempo necesario para atender tu solicitud y, si existe relación contractual, durante los plazos legales aplicables. Después se eliminan o se anonimizan.',
        ],
      },
      {
        titulo: 'Destinatarios',
        parrafos: [
          'Podemos usar proveedores tecnológicos (alojamiento, correo, CRM u hojas de cálculo) que actúan como encargados del tratamiento con contrato y garantías. No cedemos datos a terceros salvo obligación legal.',
        ],
      },
      {
        titulo: 'Derechos',
        parrafos: [
          `Puedes solicitar acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${SITE.email}. También puedes reclamar ante la Agencia Española de Protección de Datos si consideras que no se han atendido correctamente tus derechos.`,
        ],
      },
      {
        titulo: 'Analítica',
        parrafos: [
          'Solo cargamos herramientas de medición si aceptas la analítica en el aviso de cookies. En ese caso se configuran para minimizar datos personales (por ejemplo, anonimización de IP). Si rechazas, la web funciona igual.',
        ],
      },
    ],
  },
  cookies: {
    titulo: 'Política de cookies',
    descripcion: 'Qué almacena este sitio en tu navegador y cómo puedes cambiar tu decisión.',
    bloques: [
      {
        titulo: 'Qué son y qué usamos',
        parrafos: [
          'Una cookie o un almacenamiento local es un pequeño archivo que el navegador guarda para recordar información. Este sitio funciona sin cookies de terceros hasta que tú decides lo contrario.',
        ],
        lista: [
          'nomada-studio-consentimiento-v1 (almacenamiento local, técnico): recuerda si aceptaste o rechazaste la analítica.',
          '_ga y _ga_* (Google Analytics 4, analítica): solo se cargan si aceptas. Duran hasta 2 años y permiten medir visitas de forma agregada.',
        ],
      },
      {
        titulo: 'Cómo cambiar tu decisión',
        parrafos: [
          'Puedes borrar los datos de este sitio desde la configuración de tu navegador. Al hacerlo, volverás a ver el aviso de cookies.',
        ],
      },
    ],
  },
  accesibilidad: {
    titulo: 'Declaración de accesibilidad',
    descripcion: 'Compromiso de accesibilidad de este sitio web y vías para reportar barreras.',
    bloques: [
      {
        titulo: 'Compromiso',
        parrafos: [
          `En ${SITE.marca} trabajamos para que este sitio sea usable por todas las personas, siguiendo como referencia las pautas WCAG 2.1 en nivel AA. Somos un estudio pequeño y consideramos la accesibilidad una parte más del trabajo, no un extra.`,
        ],
      },
      {
        titulo: 'Medidas aplicadas',
        parrafos: ['Entre otras medidas, este sitio incorpora:'],
        lista: [
          'HTML semántico y jerarquía de encabezados coherente',
          'Navegación completa por teclado con foco visible',
          'Compatible con la preferencia de movimiento reducido del sistema',
          'Textos alternativos en las imágenes con contenido y contraste suficiente',
          'Formularios con etiquetas asociadas y errores descriptivos',
        ],
      },
      {
        titulo: 'Barreras conocidas',
        parrafos: [
          'Todavía no se ha realizado una auditoría externa de accesibilidad. Si encuentras una barrera concreta, cuéntanoslo y la revisaremos con prioridad.',
        ],
      },
      {
        titulo: 'Contacto',
        parrafos: [
          `Puedes comunicar cualquier problema de accesibilidad escribiendo a ${SITE.email} con el asunto «Accesibilidad».`,
        ],
      },
    ],
  },
};

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal.page.html',
  styleUrl: './legal.page.scss',
})
export class LegalPage implements OnDestroy {
  readonly notaBorrador = NOTA_BORRADOR;
  readonly documento: DocumentoLegal;
  readonly clave: ClaveLegal;

  private readonly consentimiento = inject(ConsentService);
  private readonly schema = inject(SchemaService);

  constructor() {
    const claveSolicitada = inject(ActivatedRoute).snapshot.data['documento'] as string;
    this.clave = esClaveLegal(claveSolicitada) ? claveSolicitada : 'aviso-legal';
    this.documento = DOCUMENTOS[this.clave];

    inject(SeoService).aplicar({
      titulo: `${this.documento.titulo} | ${SITE.marca}`,
      descripcion: this.documento.descripcion,
      ruta: `/${this.clave}`,
    });

    this.schema.establecer('webpage-legal', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${urlAbsoluta(`/${this.clave}`)}#webpage`,
      url: urlAbsoluta(`/${this.clave}`),
      name: this.documento.titulo,
      inLanguage: 'es-ES',
      isPartOf: { '@id': `${urlAbsoluta('/')}#website` },
    });
  }

  get esCookies(): boolean {
    return this.clave === 'cookies';
  }

  reiniciarConsentimiento(): void {
    this.consentimiento.reiniciar();
  }

  ngOnDestroy(): void {
    this.schema.eliminar('webpage-legal');
  }
}
