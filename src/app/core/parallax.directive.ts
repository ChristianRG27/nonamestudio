import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';

/**
 * Parallax discreto para elementos decorativos.
 *
 * Desplaza el elemento como máximo ±`appParallax` píxeles según su posición
 * en el viewport. No debe aplicarse a texto, formularios ni contenido
 * esencial. Se desactiva con `prefers-reduced-motion: reduce`.
 */
@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnDestroy {
  readonly intensidad = input<number | string>(16, { alias: 'appParallax' });

  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef);
  private limpiar?: () => void;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const nodo = this.elemento.nativeElement;
      const intensidad = Number(this.intensidad());
      const limite = Number.isFinite(intensidad) ? intensidad : 16;
      let frame = 0;

      const actualizar = (): void => {
        frame = 0;
        const caja = nodo.getBoundingClientRect();
        const centro = caja.top + caja.height / 2;
        const progreso = Math.max(-1, Math.min(1, (centro - window.innerHeight / 2) / window.innerHeight));
        nodo.style.transform = `translate3d(0, ${(-progreso * limite).toFixed(2)}px, 0)`;
      };

      const alDesplazar = (): void => {
        if (!frame) {
          frame = requestAnimationFrame(actualizar);
        }
      };

      actualizar();
      window.addEventListener('scroll', alDesplazar, { passive: true });

      this.limpiar = () => {
        window.removeEventListener('scroll', alDesplazar);
        if (frame) {
          cancelAnimationFrame(frame);
        }
        nodo.style.transform = '';
      };
    });
  }

  ngOnDestroy(): void {
    this.limpiar?.();
  }
}
