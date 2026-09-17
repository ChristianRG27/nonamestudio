import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE, urlAbsoluta } from './site.config';

export interface DatosSeo {
  titulo: string;
  descripcion: string;
  ruta: string;
  imagenSocial?: string;
  tipo?: 'website' | 'article';
  noIndex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly title: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly documento: Document,
  ) {}

  aplicar(datos: DatosSeo): void {
    const url = urlAbsoluta(datos.ruta);
    const imagen = urlAbsoluta(datos.imagenSocial ?? '/og/og-nomada-studio.jpg');

    this.title.setTitle(datos.titulo);

    this.meta.updateTag({ name: 'description', content: datos.descripcion });
    this.meta.updateTag({
      name: 'robots',
      content: datos.noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large',
    });

    this.meta.updateTag({ property: 'og:type', content: datos.tipo ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: SITE.marca });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.meta.updateTag({ property: 'og:title', content: datos.titulo });
    this.meta.updateTag({ property: 'og:description', content: datos.descripcion });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: imagen });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: `${SITE.marca}, diseño y desarrollo web en Jerez de la Frontera`,
    });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: datos.titulo });
    this.meta.updateTag({ name: 'twitter:description', content: datos.descripcion });
    this.meta.updateTag({ name: 'twitter:image', content: imagen });

    this.establecerCanonical(url);
  }

  private establecerCanonical(url: string): void {
    let enlace = this.documento.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!enlace) {
      enlace = this.documento.createElement('link');
      enlace.setAttribute('rel', 'canonical');
      this.documento.head.appendChild(enlace);
    }
    enlace.setAttribute('href', url);
  }
}
