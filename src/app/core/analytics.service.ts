import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SITE, esDatoPendiente } from './site.config';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...argumentos: unknown[]) => void;
  }
}

/**
 * Analítica respetuosa con la privacidad:
 * - No se carga ningún script de terceros hasta que la persona acepta.
 * - Los eventos se encolan y se envían solo con consentimiento e ID real de GA4.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly esNavegador: boolean;
  private cargado = false;
  private readonly cola: Array<{ nombre: string; parametros?: Record<string, unknown> }> = [];

  constructor(@Inject(PLATFORM_ID) plataforma: object) {
    this.esNavegador = isPlatformBrowser(plataforma);
  }

  cargarGa4(): void {
    if (!this.esNavegador || this.cargado || esDatoPendiente(SITE.ga4Id)) {
      return;
    }
    this.cargado = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', SITE.ga4Id, { anonymize_ip: true });

    for (const evento of this.cola.splice(0)) {
      window.gtag('event', evento.nombre, evento.parametros ?? {});
    }
  }

  evento(nombre: string, parametros?: Record<string, unknown>): void {
    if (!this.esNavegador) {
      return;
    }
    if (this.cargado && window.gtag) {
      window.gtag('event', nombre, parametros ?? {});
      return;
    }
    this.cola.push({ nombre, parametros });
  }
}
