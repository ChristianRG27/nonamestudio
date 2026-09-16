import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SITE, esDatoPendiente } from './site.config';

export interface SolicitudContacto {
  nombre: string;
  empresa: string;
  email: string;
  telefono?: string;
  mensaje: string;
  presupuesto?: string;
  origen: string;
}

export type ResultadoEnvio = 'api' | 'mailto' | 'error';

/**
 * Envío de solicitudes de contacto.
 *
 * - Si SITE.formEndpoint tiene una URL real, se envía por POST.
 * - Mientras el endpoint siga marcado como [DATO PENDIENTE], se abre el cliente
 *   de correo con la solicitud redactada, para no perder ningún contacto.
 */
@Injectable({ providedIn: 'root' })
export class ContactoService {
  constructor(private readonly http: HttpClient) {}

  async enviar(solicitud: SolicitudContacto): Promise<ResultadoEnvio> {
    if (!esDatoPendiente(SITE.formEndpoint)) {
      try {
        await firstValueFrom(this.http.post(SITE.formEndpoint, solicitud));
        return 'api';
      } catch {
        return 'error';
      }
    }

    const lineas = [
      `Nombre: ${solicitud.nombre}`,
      `Empresa: ${solicitud.empresa}`,
      `Email: ${solicitud.email}`,
      solicitud.telefono ? `Teléfono: ${solicitud.telefono}` : '',
      solicitud.presupuesto ? `Presupuesto orientativo: ${solicitud.presupuesto}` : '',
      '',
      solicitud.mensaje,
    ].filter(Boolean);

    const asunto = `Solicitud de conversación desde ${solicitud.origen}`;
    const destino = esDatoPendiente(SITE.email) ? '' : SITE.email;
    window.location.href = `mailto:${destino}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(lineas.join('\n'))}`;
    return 'mailto';
  }
}
