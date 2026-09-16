import { Component } from '@angular/core';
import { RevelarDirective } from '../../../core/revelar.directive';
import { TarjetaInteractivaDirective } from '../../../core/tarjeta-interactiva.directive';

@Component({
  selector: 'app-valor',
  standalone: true,
  imports: [RevelarDirective, TarjetaInteractivaDirective],
  templateUrl: './valor.component.html',
  styleUrl: './valor.component.scss',
})
export class ValorComponent {
  readonly pilares = [
    {
      numero: '01',
      titulo: 'Que te encuentren',
      texto: 'Una web rápida, clara y preparada para que Google y las personas entiendan lo que ofreces.',
    },
    {
      numero: '02',
      titulo: 'Que confíen en ti',
      texto: 'Mensajes que responden dudas antes de que tengan que preguntarlas.',
    },
    {
      numero: '03',
      titulo: 'Que el trabajo fluya',
      texto: 'Formularios, reservas, CRM e IA conectados solo cuando aportan algo.',
    },
  ];
}
