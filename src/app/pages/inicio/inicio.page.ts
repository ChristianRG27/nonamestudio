import { Component, OnDestroy, inject } from '@angular/core';
import { SchemaService } from '../../core/schema.service';
import { SeoService } from '../../core/seo.service';
import { FAQS, SITE, urlAbsoluta } from '../../core/site.config';
import { ConversionComponent } from './secciones/conversion.component';
import { FaqComponent } from './secciones/faq.component';
import { HeroComponent } from './secciones/hero.component';
import { IaComponent } from './secciones/ia.component';
import { LocalComponent } from './secciones/local.component';
import { MetodoComponent } from './secciones/metodo.component';
import { ResenasComponent } from './secciones/resenas.component';
import { SistemasComponent } from './secciones/sistemas.component';
import { TextoScrollComponent } from './secciones/texto-scroll.component';
import { ValorComponent } from './secciones/valor.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    HeroComponent,
    TextoScrollComponent,
    ValorComponent,
    IaComponent,
    MetodoComponent,
    SistemasComponent,
    LocalComponent,
    ResenasComponent,
    FaqComponent,
    ConversionComponent,
  ],
  templateUrl: './inicio.page.html',
  styleUrl: './inicio.page.scss',
})
export class InicioPage implements OnDestroy {
  private readonly seo = inject(SeoService);
  private readonly schema = inject(SchemaService);

  constructor() {
    this.seo.aplicar({
      titulo: `${SITE.marca} | Diseño web, software e IA en Jerez`,
      descripcion:
        'Webs, tiendas, CRM e IA para negocios de Jerez y Cádiz. Capta mejor, ordena el trabajo y deja de perder oportunidades.',
      ruta: '/',
    });

    this.schema.establecer('webpage-inicio', {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${urlAbsoluta('/')}#webpage`,
      url: urlAbsoluta('/'),
      name: `${SITE.marca} | Diseño web, software e IA en Jerez`,
      description:
        'Webs, tiendas, CRM e IA para negocios de Jerez y Cádiz. Capta mejor, ordena el trabajo y deja de perder oportunidades.',
      inLanguage: 'es-ES',
      isPartOf: { '@id': `${urlAbsoluta('/')}#website` },
      about: { '@id': `${urlAbsoluta('/')}#organizacion` },
    });

    this.schema.establecer('faq-inicio', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${urlAbsoluta('/')}#faq`,
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.pregunta,
        acceptedAnswer: { '@type': 'Answer', text: faq.respuesta },
      })),
    });
  }

  ngOnDestroy(): void {
    this.schema.eliminar('webpage-inicio');
    this.schema.eliminar('faq-inicio');
  }
}
