import { Component } from '@angular/core';
import { RevelarDirective } from '../../../core/revelar.directive';
import { RESENAS, SITE, esDatoPendiente } from '../../../core/site.config';

@Component({
  selector: 'app-resenas',
  standalone: true,
  imports: [RevelarDirective],
  templateUrl: './resenas.component.html',
  styleUrl: './resenas.component.scss',
})
export class ResenasComponent {
  readonly resenas = RESENAS;
  readonly fichaGoogle = SITE.googleReviews;
  readonly valoracion = SITE.valoracionGoogle;
  readonly disponible = (valor: string): boolean => !esDatoPendiente(valor);

  /** Dos filas con el orden invertido para que no avancen igual. */
  readonly filas = [this.resenas, [...this.resenas].reverse()];
}
