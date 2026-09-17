import { Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchemaService } from '../../core/schema.service';
import { SeoService } from '../../core/seo.service';
import { SITE, urlAbsoluta } from '../../core/site.config';
import { ContactoDirectoComponent } from '../../shared/contacto-directo.component';
import { FormularioContactoComponent } from '../../shared/formulario-contacto.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [RouterLink, FormularioContactoComponent, ContactoDirectoComponent],
  templateUrl: './contacto.page.html',
  styleUrl: './contacto.page.scss',
})
export class ContactoPage implements OnDestroy {
  readonly plazo = SITE.plazoRespuesta;

  private readonly schema = inject(SchemaService);

  readonly pasos = [
    {
      titulo: 'Te respondemos',
      texto: `En ${SITE.plazoRespuesta}, con las primeras preguntas o una propuesta para hablar.`,
    },
    {
      titulo: 'Entendemos el contexto',
      texto:
        'En una reunión presencial o por videollamada, revisamos objetivos, plazos y prioridades.',
    },
    {
      titulo: 'Recibes una propuesta clara',
      texto:
        'Si encaja, te enviamos alcance, calendario, responsabilidades y lo que queda fuera.',
    },
  ];

  constructor() {
    inject(SeoService).aplicar({
      titulo: `Contacto | ${SITE.marca}, Jerez`,
      descripcion:
        `Cuéntanos qué quieres mejorar en tu web, ventas, reservas o procesos internos. Te respondemos en ${SITE.plazoRespuesta}.`,
      ruta: '/contacto',
    });

    this.schema.establecer('webpage-contacto', {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${urlAbsoluta('/contacto')}#webpage`,
      url: urlAbsoluta('/contacto'),
      name: `Contacto | ${SITE.marca}`,
      inLanguage: 'es-ES',
      isPartOf: { '@id': `${urlAbsoluta('/')}#website` },
      about: { '@id': `${urlAbsoluta('/')}#organizacion` },
    });
  }

  ngOnDestroy(): void {
    this.schema.eliminar('webpage-contacto');
  }
}
