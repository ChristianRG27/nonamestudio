import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, OnDestroy, PLATFORM_ID, afterNextRender, inject, input } from '@angular/core';

/**
 * Revela un grupo o escena cuando entra en pantalla: `opacity` 0 → 1 y
 * `translateY(24px)` → 0, una sola vez y sin librerías externas.
 *
 * El valor del input es el retardo en milisegundos (útil para escalonar).
 * Si no hay IntersectionObserver o el usuario pide movimiento reducido, el
 * contenido se muestra sin animación. Sin JavaScript, es visible por defecto.
 */
@Directive({
  selector: '[appRevelar]',
  standalone: true,
})
export class RevelarDirective implements OnDestroy {
  readonly retardo = input<number | string>(0, { alias: 'appRevelar' });

  private readonly elemento = inject<ElementRef<HTMLElement>>(ElementRef);
  private observador?: IntersectionObserver;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    afterNextRender(() => {
      const nodo = this.elemento.nativeElement;
      const retardo = Number(this.retardo());
      nodo.style.setProperty('--revelar-retardo', `${Number.isFinite(retardo) ? retardo : 0}ms`);

      const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (movimientoReducido || !('IntersectionObserver' in window)) {
        nodo.classList.add('revelar', 'revelado');
        return;
      }

      const caja = nodo.getBoundingClientRect();
      const yaVisible = caja.top < window.innerHeight * 0.92 && caja.bottom > 0;

      nodo.classList.add('revelar');
      if (yaVisible) {
        nodo.classList.add('revelado');
        return;
      }

      this.observador = new IntersectionObserver(
        (entradas) => {
          if (entradas.some((entrada) => entrada.isIntersecting)) {
            nodo.classList.add('revelado');
            this.observador?.disconnect();
          }
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.06 },
      );
      this.observador.observe(nodo);
    });
  }

  ngOnDestroy(): void {
    this.observador?.disconnect();
  }
}
