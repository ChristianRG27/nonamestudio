import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SchemaService } from '../../core/schema.service';
import { SeoService } from '../../core/seo.service';
import { SERVICIOS, SITE, Servicio, obtenerServicio, urlAbsoluta } from '../../core/site.config';

@Component({
  selector: 'app-servicio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './servicio.page.html',
  styleUrl: './servicio.page.scss',
})
export class ServicioPage implements OnDestroy {
  readonly servicio: Servicio | undefined;
  readonly otros: Servicio[];

  private readonly seo = inject(SeoService);
  private readonly schema = inject(SchemaService);

  constructor() {
    const slug = inject(ActivatedRoute).snapshot.paramMap.get('slug') ?? '';
    this.servicio = obtenerServicio(slug);
    this.otros = SERVICIOS.filter((servicio) => servicio.slug !== slug);

    if (!this.servicio) {
      this.seo.aplicar({
        titulo: `Servicio no encontrado | ${SITE.marca}`,
        descripcion: 'El servicio que buscas no existe o ha cambiado de dirección.',
        ruta: `/servicios/${slug}`,
        noIndex: true,
      });
      return;
    }

    const ruta = `/servicios/${this.servicio.slug}`;
    this.seo.aplicar({
      titulo: this.servicio.metaTitle,
      descripcion: this.servicio.metaDescription,
      ruta,
    });

    this.schema.establecer('service-servicio', {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${urlAbsoluta(ruta)}#service`,
      url: urlAbsoluta(ruta),
      name: this.servicio.nombre,
      serviceType: this.servicio.nombre,
      description: this.servicio.metaDescription,
      provider: { '@id': `${urlAbsoluta('/')}#organizacion` },
      areaServed: [
        { '@type': 'City', name: 'Jerez de la Frontera' },
        { '@type': 'AdministrativeArea', name: 'Provincia de Cádiz' },
      ],
      availableLanguage: 'es',
    });
  }

  ngOnDestroy(): void {
    this.schema.eliminar('service-servicio');
  }
}
