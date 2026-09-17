import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sobre.page.html',
  styleUrl: './sobre.page.scss',
})
export class SobrePage {
  readonly marca = SITE.marca;

  readonly principios = [
    {
      titulo: 'Primero las palabras, luego las pantallas.',
      texto: 'Si el mensaje no está claro, el diseño no lo arregla.',
    },
    {
      titulo: 'Decimos también lo que no hace falta.',
      texto: 'No recomendamos tecnología por vender más.',
    },
    {
      titulo: 'Cada herramienta tiene que justificar su sitio.',
      texto: 'La complejidad solo vale si resuelve algo.',
    },
    {
      titulo: 'Tus datos y tus accesos son tuyos.',
      texto: 'Lo dejamos claro desde el principio.',
    },
  ];

  readonly ficha = [
    { etiqueta: 'Razón social', valor: SITE.razonSocial },
    { etiqueta: 'Inicio de actividad', valor: '[DATO PENDIENTE]' },
    { etiqueta: 'Equipo', valor: '[DATO PENDIENTE]' },
    { etiqueta: 'Dirección', valor: SITE.direccion },
    { etiqueta: 'Email', valor: SITE.email },
    { etiqueta: 'Teléfono', valor: SITE.telefono },
  ];

  constructor() {
    inject(SeoService).aplicar({
      titulo: `Sobre ${SITE.marca} | Estudio digital en Jerez`,
      descripcion:
        `${SITE.marca} es un estudio digital con base en Jerez de la Frontera. Diseñamos webs, tiendas online, CRM y automatizaciones con criterio y sin promesas infladas.`,
      ruta: '/sobre',
    });
  }
}
