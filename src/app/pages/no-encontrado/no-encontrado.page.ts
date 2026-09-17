import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-no-encontrado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './no-encontrado.page.html',
  styleUrl: './no-encontrado.page.scss',
})
export class NoEncontradoPage {
  readonly enlaces = [
    { etiqueta: 'Ver servicios', ruta: '/servicios' },
    { etiqueta: 'Conocer el proceso', ruta: '/proceso' },
    { etiqueta: 'Ver proyectos', ruta: '/proyectos' },
    { etiqueta: 'Contactar', ruta: '/contacto' },
  ];

  constructor() {
    inject(SeoService).aplicar({
      titulo: `Página no encontrada | ${SITE.marca}`,
      descripcion: 'La página que buscas no existe o ha cambiado de dirección.',
      ruta: '/no-encontrado',
      noIndex: true,
    });
  }
}
