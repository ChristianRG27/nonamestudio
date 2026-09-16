import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-recursos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './recursos.page.html',
  styleUrl: './recursos.page.scss',
})
export class RecursosPage {
  readonly enPreparacion = [
    {
      titulo: 'Qué automatizar primero (y qué dejar como está)',
      descripcion: 'Identifica la primera tarea que puede ahorrarte tiempo sin crear otro problema.',
    },
    {
      titulo: 'Cómo elegir CRM sin pagar por funciones que no usarás',
      descripcion: 'Señales, errores y criterios para elegir con sentido.',
    },
    {
      titulo: 'SEO local en Jerez: qué mueve la aguja de verdad',
      descripcion: 'Lo que ayuda a que te encuentren sin trucos ni listas de ciudades.',
    },
    {
      titulo: 'La carta digital que tus clientes sí quieren usar',
      descripcion: 'Velocidad, lectura, alérgenos e idiomas sin frustración.',
    },
  ];

  constructor() {
    inject(SeoService).aplicar({
      titulo: `Recursos | ${SITE.marca}`,
      descripcion:
        'Guías y artículos en preparación sobre automatización, CRM, SEO local y cartas digitales para empresas de Jerez y Cádiz.',
      ruta: '/recursos',
    });
  }
}
