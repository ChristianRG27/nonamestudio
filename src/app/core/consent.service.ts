import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, afterNextRender, signal } from '@angular/core';
import { AnalyticsService } from './analytics.service';

export type EstadoConsentimiento = 'pendiente' | 'aceptado' | 'rechazado';

const CLAVE = 'nomada-studio-consentimiento-v1';

@Injectable({ providedIn: 'root' })
export class ConsentService {
  private readonly esNavegador: boolean;
  readonly estado = signal<EstadoConsentimiento>('pendiente');
  /** Verdadero cuando ya se ha leído la decisión guardada (evita parpadeos). */
  readonly cargado = signal(false);

  constructor(
    @Inject(PLATFORM_ID) plataforma: object,
    private readonly analitica: AnalyticsService,
  ) {
    this.esNavegador = isPlatformBrowser(plataforma);
    if (this.esNavegador) {
      afterNextRender(() => {
        const guardado = localStorage.getItem(CLAVE) as EstadoConsentimiento | null;
        if (guardado === 'aceptado' || guardado === 'rechazado') {
          this.estado.set(guardado);
          if (guardado === 'aceptado') {
            this.analitica.cargarGa4();
          }
        }
        this.cargado.set(true);
      });
    }
  }

  aceptar(): void {
    this.estado.set('aceptado');
    if (this.esNavegador) {
      localStorage.setItem(CLAVE, 'aceptado');
    }
    this.analitica.cargarGa4();
  }

  rechazar(): void {
    this.estado.set('rechazado');
    if (this.esNavegador) {
      localStorage.setItem(CLAVE, 'rechazado');
    }
  }

  reiniciar(): void {
    if (!this.esNavegador) {
      return;
    }
    localStorage.removeItem(CLAVE);
    window.location.reload();
  }
}
