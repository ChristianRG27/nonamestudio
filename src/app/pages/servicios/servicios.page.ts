import { Component, OnDestroy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SchemaService } from '../../core/schema.service';
import { SeoService } from '../../core/seo.service';
import { SERVICIOS, SITE, urlAbsoluta } from '../../core/site.config';
import { IconoServicioComponent } from '../../shared/icono-servicio.component';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, IconoServicioComponent],
  templateUrl: './servicios.page.html',
  styleUrl: './servicios.page.scss',
})
export class ServiciosPage implements OnDestroy {
  readonly servicios = SERVICIOS;

  private readonly schema = inject(SchemaService);

  constructor() {
    inject(SeoService).aplicar({
      titulo: `Servicios digitales para empresas | ${SITE.marca}, Jerez`,
      descripcion:
        'Diseño web, ecommerce, CRM y automatización para negocios que quieren crecer sin añadir más caos.',
      ruta: '/servicios',
    });

    this.schema.establecer('webpage-servicios', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${urlAbsoluta('/servicios')}#webpage`,
      url: urlAbsoluta('/servicios'),
      name: 'Servicios',
      inLanguage: 'es-ES',
      isPartOf: { '@id': `${urlAbsoluta('/')}#website` },
    });
  }

  ngOnDestroy(): void {
    this.schema.eliminar('webpage-servicios');
  }
}
