import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ParallaxDirective } from '../../../core/parallax.directive';
import { RevelarDirective } from '../../../core/revelar.directive';
import { TarjetaInteractivaDirective } from '../../../core/tarjeta-interactiva.directive';
import { InterfazVisualComponent, TipoInterfaz } from '../../../shared/interfaz-visual.component';

interface PiezaSistema {
  tipo: TipoInterfaz;
  titulo: string;
  servicio: string;
  ruta: string;
  columna: string;
  escala: number;
  desplazamiento: number;
}

@Component({
  selector: 'app-sistemas',
  standalone: true,
  imports: [RouterLink, InterfazVisualComponent, RevelarDirective, ParallaxDirective, TarjetaInteractivaDirective],
  templateUrl: './sistemas.component.html',
  styleUrl: './sistemas.component.scss',
})
export class SistemasComponent {
  readonly piezas: PiezaSistema[] = [
    {
      tipo: 'web',
      titulo: 'Una web que convierte visitas en conversaciones',
      servicio: 'web corporativa',
      ruta: '/servicios/diseno-web-corporativo',
      columna: '1 / span 5',
      escala: 1,
      desplazamiento: 0,
    },
    {
      tipo: 'crm',
      titulo: 'Un CRM que muestra qué toca hacer ahora',
      servicio: 'CRM y aplicaciones web',
      ruta: '/servicios/crm-aplicaciones-web',
      columna: '6 / span 4',
      escala: 1.04,
      desplazamiento: -18,
    },
    {
      tipo: 'automatizacion',
      titulo: 'Un flujo que quita trabajo repetitivo',
      servicio: 'IA y automatización',
      ruta: '/servicios/ia-automatizacion',
      columna: '10 / span 3',
      escala: 0.97,
      desplazamiento: 16,
    },
    {
      tipo: 'reservas',
      titulo: 'Reservas y carta digital sin fricción',
      servicio: 'soluciones para restauración',
      ruta: '/servicios/restauracion-turismo',
      columna: '1 / span 3',
      escala: 0.96,
      desplazamiento: 14,
    },
    {
      tipo: 'tienda',
      titulo: 'Una tienda que no complica el back office',
      servicio: 'tiendas online',
      ruta: '/servicios/tiendas-online',
      columna: '4 / span 5',
      escala: 1.03,
      desplazamiento: -14,
    },
    {
      tipo: 'landing',
      titulo: 'Una campaña que se puede medir de verdad',
      servicio: 'landing pages',
      ruta: '/servicios/landing-pages',
      columna: '9 / span 4',
      escala: 1,
      desplazamiento: 8,
    },
  ];
}
