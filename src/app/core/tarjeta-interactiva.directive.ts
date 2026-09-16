import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';

/**
 * Efectos de puntero para tarjetas interactivas: inclinación 3D suave y foco
 * de luz que sigue al cursor. Publica variables CSS (--giro-x, --giro-y,
 * --punto-x, --punto-y) que la tarjeta consume.
 *
 * El valor del input son los grados máximos de inclinación: 0 (o el atributo
 * sin valor) deja solo el foco de luz, 5 inclina hasta 5°. Solo se activa en
 * ratón o lápiz con puntero fino y sin movimiento reducido; en táctil o con
 * teclado la tarjeta funciona igual, sin efectos.
 */
@Directive({
  selector: '[appTarjetaInteractiva]',
  standalone: true,
})
export class TarjetaInteractivaDirective implements OnDestroy {
  readonly inclinacion = input<number | string>(0, { alias: 'appTarjetaInteractiva' });

  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef);
  private limpiar?: () => void;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    afterNextRender(() => {
      if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
      }
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const nodo = this.elemento.nativeElement;
      const valor = Number(this.inclinacion());
      const giroMaximo = Number.isFinite(valor) ? valor : 0;
      let frame = 0;
      let ultimo: PointerEvent | null = null;

      const aplicar = (): void => {
        frame = 0;
        if (!ultimo) {
          return;
        }
        const caja = nodo.getBoundingClientRect();
        const x = (ultimo.clientX - caja.left) / caja.width;
        const y = (ultimo.clientY - caja.top) / caja.height;

        nodo.style.setProperty('--punto-x', `${(x * 100).toFixed(1)}%`);
        nodo.style.setProperty('--punto-y', `${(y * 100).toFixed(1)}%`);

        if (giroMaximo > 0) {
          nodo.style.setProperty('--giro-x', `${((0.5 - y) * giroMaximo).toFixed(2)}deg`);
          nodo.style.setProperty('--giro-y', `${((x - 0.5) * giroMaximo).toFixed(2)}deg`);
        }
      };

      const alMover = (evento: PointerEvent): void => {
        ultimo = evento;
        if (!frame) {
          frame = requestAnimationFrame(aplicar);
        }
      };

      const alSalir = (): void => {
        ultimo = null;
        nodo.style.removeProperty('--giro-x');
        nodo.style.removeProperty('--giro-y');
        nodo.style.removeProperty('--punto-x');
        nodo.style.removeProperty('--punto-y');
      };

      nodo.addEventListener('pointermove', alMover);
      nodo.addEventListener('pointerleave', alSalir);
      nodo.addEventListener('pointercancel', alSalir);

      this.limpiar = () => {
        nodo.removeEventListener('pointermove', alMover);
        nodo.removeEventListener('pointerleave', alSalir);
        nodo.removeEventListener('pointercancel', alSalir);
        if (frame) {
          cancelAnimationFrame(frame);
        }
      };
    });
  }

  ngOnDestroy(): void {
    this.limpiar?.();
  }
}
