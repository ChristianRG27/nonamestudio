import { Component, input } from '@angular/core';
import { SITE, esDatoPendiente } from '../core/site.config';

@Component({
  selector: 'app-contacto-directo',
  standalone: true,
  templateUrl: './contacto-directo.component.html',
  styleUrl: './contacto-directo.component.scss',
})
export class ContactoDirectoComponent {
  readonly texto = input(
    '¿Prefieres hablarlo? Llámanos, escríbenos por WhatsApp o reserva una conversación.',
  );

  readonly telefono = SITE.telefono;
  readonly whatsapp = SITE.whatsapp;
  readonly email = SITE.email;
  readonly horario = SITE.horario;
  readonly bookingUrl = SITE.bookingUrl;
  readonly disponible = (valor: string): boolean => !esDatoPendiente(valor);
  readonly enlaceTelefono = `tel:${SITE.telefono.replace(/\s/g, '')}`;
  readonly enlaceWhatsapp = `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`;
}
