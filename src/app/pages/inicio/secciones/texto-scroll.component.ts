import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  computed,
  inject,
  input,
  viewChild,
  viewChildren,
} from '@angular/core';

/** Gris claro de las palabras aún sin pintar. */
const GRIS_INICIAL: readonly [number, number, number] = [213, 213, 213];

/** Gris oscuro de las palabras ya pintadas. */
const GRIS_FINAL: readonly [number, number, number] = [23, 23, 23];

const TEXTO_POR_DEFECTO =
  'Cada negocio que crece empieza igual: alguien entiende lo que haces, confía en ti y da el primer paso. Nosotros construimos la parte digital que lo hace posible: una web que atrae, un sistema que ordena y una IA que devuelve tiempo al equipo.';

/**
 * Pinta un texto con el scroll: todas las palabras parten de un gris claro y
 * se van oscureciendo en orden, de izquierda a derecha, según el progreso real
 * de la sección. El efecto es reversible y no oculta el texto en ningún momento.
 *
 * La sección reserva altura de sobra (160-180vh) y el contenido queda fijado
 * con `position: sticky`, de modo que el recorrido de scroll controla la
 * animación con precisión.
 */
@Component({
  selector: 'app-texto-scroll',
  standalone: true,
  templateUrl: './texto-scroll.component.html',
  styleUrl: './texto-scroll.component.scss',
})
export class TextoScrollComponent implements OnDestroy {
  /** Texto que se pinta con el scroll. Por defecto, el manifiesto del estudio. */
  readonly texto = input<string>(TEXTO_POR_DEFECTO);

  readonly palabras = computed(() => this.texto().split(/\s+/).filter(Boolean));

  private readonly seccion = viewChild<ElementRef<HTMLElement>>('seccion');
  private readonly palabrasRef = viewChildren<ElementRef<HTMLElement>>('palabra');
  private readonly plataforma = inject(PLATFORM_ID);
  private readonly zona = inject(NgZone);

  private observador?: IntersectionObserver;
  private frame = 0;
  private activa = false;
  private ultimoProgreso = -1;
  private readonly pintados: number[] = [];

  constructor() {
    if (!isPlatformBrowser(this.plataforma)) {
      return;
    }

    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }
      this.zona.runOutsideAngular(() => this.preparar());
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.plataforma)) {
      return;
    }
    this.observador?.disconnect();
    window.removeEventListener('scroll', this.alDesplazar);
    window.removeEventListener('resize', this.alDesplazar);
    cancelAnimationFrame(this.frame);
  }

  private preparar(): void {
    const seccion = this.seccion()?.nativeElement;
    if (!seccion) {
      return;
    }

    window.addEventListener('scroll', this.alDesplazar, { passive: true });
    window.addEventListener('resize', this.alDesplazar, { passive: true });

    if ('IntersectionObserver' in window) {
      this.observador = new IntersectionObserver((entradas) => {
        this.activa = entradas.some((entrada) => entrada.isIntersecting);
        if (this.activa) {
          this.alDesplazar();
        }
      });
      this.observador.observe(seccion);
    } else {
      this.activa = true;
    }

    this.actualizar();
  }

  private readonly alDesplazar = (): void => {
    if (!this.activa || this.frame) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.actualizar();
    });
  };

  private actualizar(): void {
    const seccion = this.seccion()?.nativeElement;
    if (!seccion) {
      return;
    }

    const recorrido = seccion.offsetHeight - window.innerHeight;
    if (recorrido <= 0) {
      return;
    }

    const progreso = Math.min(Math.max(-seccion.getBoundingClientRect().top / recorrido, 0), 1);
    if (Math.abs(progreso - this.ultimoProgreso) < 0.0005) {
      return;
    }
    this.ultimoProgreso = progreso;

    const palabras = this.palabrasRef();
    const total = palabras.length;
    if (this.pintados.length !== total) {
      this.pintados.length = 0;
    }

    const transicion = Math.max(2, Math.round(total * 0.1));
    const avance = progreso * (total + transicion);

    palabras.forEach((referencia, indice) => {
      const local = Math.min(Math.max((avance - indice) / transicion, 0), 1);
      const suavizado = local * local * (3 - 2 * local);
      if (Math.abs(suavizado - (this.pintados[indice] ?? -1)) < 0.002) {
        return;
      }
      this.pintados[indice] = suavizado;
      referencia.nativeElement.style.color = this.mezclar(suavizado);
    });
  }

  private mezclar(progreso: number): string {
    const canal = (inicio: number, fin: number): number =>
      Math.round(inicio + (fin - inicio) * progreso);
    return `rgb(${canal(GRIS_INICIAL[0], GRIS_FINAL[0])}, ${canal(GRIS_INICIAL[1], GRIS_FINAL[1])}, ${canal(GRIS_INICIAL[2], GRIS_FINAL[2])})`;
  }
}
