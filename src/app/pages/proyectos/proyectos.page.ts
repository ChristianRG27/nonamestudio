import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './proyectos.page.html',
  styleUrl: './proyectos.page.scss',
})
export class ProyectosPage {
  readonly textoBloque =
    'Cada caso explicará el sector y la localidad, el punto de partida, la solución creada, las integraciones importantes y los resultados solo cuando estén medidos y autorizados.';

  readonly principios = [
    {
      titulo: 'Trabajo real, no maquetas disfrazadas.',
      texto: 'Si no está hecho, no aparece aquí.',
    },
    {
      titulo: 'Los datos del cliente siguen siendo del cliente.',
      texto: 'Un resultado solo se publica con documentación y autorización expresa.',
    },
    {
      titulo: 'El contexto importa más que una captura bonita.',
      texto: 'Nos interesa explicar el problema y las decisiones, no acumular capturas.',
    },
  ];

  constructor() {
    inject(SeoService).aplicar({
      titulo: `Proyectos | ${SITE.marca}`,
      descripcion:
        'Casos de diseño web, tiendas online, CRM y automatización en Jerez y la provincia de Cádiz. Publicamos solo proyectos reales y resultados autorizados.',
      ruta: '/proyectos',
    });
  }
}
