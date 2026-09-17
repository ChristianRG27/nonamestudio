import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, NgZone, PLATFORM_ID, inject } from '@angular/core';
import Lenis from 'lenis';

/**
 * Desplazamiento suave con inercia (Lenis) y desplazamiento animado a anclas.
 *
 * - Se desactiva por completo con `prefers-reduced-motion: reduce`.
 * - Puede pausarse (por ejemplo, con el menú móvil abierto).
 * - Los enlaces internos (#ancla) se animan dejando hueco para la cabecera.
 * - Corre fuera de Angular para no disparar detección de cambios en cada frame.
 */
@Injectable({ providedIn: 'root' })
export class ScrollSuaveService {
  private lenis: Lenis | null = null;
  private readonly documento = inject(DOCUMENT);
  private readonly plataforma = inject(PLATFORM_ID);
  private readonly zona = inject(NgZone);

  iniciar(): void {
    if (!isPlatformBrowser(this.plataforma) || this.lenis) {
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.zona.runOutsideAngular(() => {
      this.lenis = new Lenis({
        autoRaf: true,
        duration: 1.05,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.2,
      });
      this.documento.addEventListener('click', this.alPulsarEnlace);
    });
  }

  detener(): void {
    this.lenis?.stop();
  }

  reanudar(): void {
    this.lenis?.start();
  }

  irA(destino: HTMLElement | string | number): void {
    if (!this.lenis) {
      return;
    }
    this.lenis.scrollTo(destino, { offset: -this.alturaCabecera(), duration: 1.15 });
  }

  private alturaCabecera(): number {
    const valor = getComputedStyle(this.documento.documentElement)
      .getPropertyValue('--altura-cabecera')
      .trim();
    return Number.parseFloat(valor) || 84;
  }

  private readonly alPulsarEnlace = (evento: Event): void => {
    const enlace = (evento.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const identificador = enlace?.getAttribute('href')?.slice(1);
    if (!identificador) {
      return;
    }

    const destino = this.documento.getElementById(identificador);
    if (!destino) {
      return;
    }

    evento.preventDefault();
    this.irA(destino);
  };
}
