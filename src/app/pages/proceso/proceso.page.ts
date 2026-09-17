import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { PROCESO, SITE } from '../../core/site.config';

@Component({
  selector: 'app-proceso',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proceso.page.html',
  styleUrl: './proceso.page.scss',
})
export class ProcesoPage {
  readonly pasos = PROCESO;

  constructor() {
    inject(SeoService).aplicar({
      titulo: `Proceso de trabajo | ${SITE.marca}`,
      descripcion:
        'Así trabajamos: descubrimiento, orden, diseño, desarrollo y mejora continua. Alcance, calendario y responsabilidades claros antes de empezar.',
      ruta: '/proceso',
    });
  }
}
