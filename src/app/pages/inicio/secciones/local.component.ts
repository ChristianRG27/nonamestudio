import { Component } from '@angular/core';
import { RevelarDirective } from '../../../core/revelar.directive';
import { TarjetaInteractivaDirective } from '../../../core/tarjeta-interactiva.directive';
import { SITE } from '../../../core/site.config';

@Component({
  selector: 'app-local',
  standalone: true,
  imports: [RevelarDirective, TarjetaInteractivaDirective],
  templateUrl: './local.component.html',
  styleUrl: './local.component.scss',
})
export class LocalComponent {
  readonly ciudad = SITE.ciudad;
  readonly provincia = SITE.provincia;
  readonly puntos = [
    'Presencial o por videollamada, según lo que te resulte más útil.',
    'Experiencia pensada para negocios de la provincia de Cádiz.',
    'Colaboración remota cuando el proyecto lo pide.',
  ];
}
