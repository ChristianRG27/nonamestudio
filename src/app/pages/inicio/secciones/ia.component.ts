import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevelarDirective } from '../../../core/revelar.directive';
import { ESCENARIOS_IA, NOTA_IA } from '../../../core/site.config';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [RouterLink, RevelarDirective],
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.scss',
})
export class IaComponent implements OnDestroy {
  readonly escenarios = ESCENARIOS_IA;
  readonly nota = NOTA_IA;

  private readonly plataforma = inject(PLATFORM_ID);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private consultaMovimiento?: MediaQueryList;
  private frame = 0;

  constructor() {
    if (!isPlatformBrowser(this.plataforma)) {
      return;
    }
    afterNextRender(() => this.prepararProgreso());
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.plataforma)) {
      return;
    }
    this.consultaMovimiento?.removeEventListener('change', this.alCambiarMovimiento);
    window.removeEventListener('scroll', this.alHacerScroll);
    window.removeEventListener('resize', this.alHacerScroll);
    cancelAnimationFrame(this.frame);
  }

  /* ==========================================================================
     Sección fijada con avance de scroll
     --------------------------------------------------------------------------
     Publica «--avance-ia» (0 → 1) mientras la sección está parada: los
     escenarios entran por la derecha según avanza el recorrido.
     ========================================================================== */

  private prepararProgreso(): void {
    this.host.nativeElement.classList.add('ia--fijado');
    this.consultaMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.consultaMovimiento.addEventListener('change', this.alCambiarMovimiento);
    this.activarEscucha();
    this.actualizarProgreso();
  }

  private activarEscucha(): void {
    if (this.consultaMovimiento?.matches) {
      return;
    }
    window.addEventListener('scroll', this.alHacerScroll, { passive: true });
    window.addEventListener('resize', this.alHacerScroll, { passive: true });
  }

  private readonly alHacerScroll = (): void => {
    if (this.frame) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.actualizarProgreso();
    });
  };

  private actualizarProgreso(): void {
    const host = this.host.nativeElement;
    const recorrido = host.offsetHeight - window.innerHeight;

    if (recorrido <= 0) {
      host.style.removeProperty('--avance-ia');
      return;
    }

    const caja = host.getBoundingClientRect();
    const avance = Math.min(1, Math.max(0, -caja.top / recorrido));
    host.style.setProperty('--avance-ia', `${Math.round(avance * 1000) / 1000}`);
  }

  private readonly alCambiarMovimiento = (evento: MediaQueryListEvent): void => {
    if (evento.matches) {
      window.removeEventListener('scroll', this.alHacerScroll);
      window.removeEventListener('resize', this.alHacerScroll);
      cancelAnimationFrame(this.frame);
      this.host.nativeElement.style.removeProperty('--avance-ia');
      return;
    }
    this.activarEscucha();
    this.actualizarProgreso();
  };
}
