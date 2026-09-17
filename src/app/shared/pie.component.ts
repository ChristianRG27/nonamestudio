import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NAVEGACION, SERVICIOS, SITE, esDatoPendiente } from '../core/site.config';

@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.scss',
})
export class PieComponent {
  readonly marca = SITE.marca;
  readonly email = SITE.email;
  readonly telefono = SITE.telefono;
  readonly whatsapp = SITE.whatsapp;
  readonly horario = SITE.horario;
  readonly direccion = SITE.direccion;
  readonly ciudad = SITE.ciudad;
  readonly googleMaps = SITE.googleMaps;
  readonly redes = [
    { nombre: 'Instagram', url: SITE.redes.instagram },
    { nombre: 'LinkedIn', url: SITE.redes.linkedin },
    { nombre: 'GitHub', url: SITE.redes.github },
  ].filter((red) => red.url.length > 0);
  readonly servicios = SERVICIOS;
  readonly estudio = NAVEGACION.filter((item) => item.ruta !== '/servicios');

  readonly disponible = (valor: string): boolean => !esDatoPendiente(valor);
  readonly enlaceTelefono = `tel:${SITE.telefono.replace(/\s/g, '')}`;
  readonly enlaceWhatsapp = `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, '')}`;
}
