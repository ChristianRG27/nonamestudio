import { Component } from '@angular/core';
import { RevelarDirective } from '../../../core/revelar.directive';
import { ContactoDirectoComponent } from '../../../shared/contacto-directo.component';
import { FormularioContactoComponent } from '../../../shared/formulario-contacto.component';

@Component({
  selector: 'app-conversion',
  standalone: true,
  imports: [FormularioContactoComponent, ContactoDirectoComponent, RevelarDirective],
  templateUrl: './conversion.component.html',
  styleUrl: './conversion.component.scss',
})
export class ConversionComponent {}
