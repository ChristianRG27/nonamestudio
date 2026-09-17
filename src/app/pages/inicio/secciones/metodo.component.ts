import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevelarDirective } from '../../../core/revelar.directive';
import { TarjetaInteractivaDirective } from '../../../core/tarjeta-interactiva.directive';
import { PASOS_METODO } from '../../../core/site.config';

@Component({
  selector: 'app-metodo',
  standalone: true,
  imports: [RouterLink, RevelarDirective, TarjetaInteractivaDirective],
  templateUrl: './metodo.component.html',
  styleUrl: './metodo.component.scss',
})
export class MetodoComponent {
  readonly pasos = PASOS_METODO;
}
