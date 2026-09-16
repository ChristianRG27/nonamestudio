import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnDestroy {
  /** Palabras del efecto de máquina de escribir del titular. */
  readonly palabras = ['claridad', 'orden', 'tiempo', 'sistema'];

  private readonly poster = viewChild<ElementRef<HTMLImageElement>>('poster');
  private readonly video = viewChild<ElementRef<HTMLVideoElement>>('video');
  private readonly palabraRef = viewChild<ElementRef<HTMLElement>>('palabra');
  private readonly plataforma = inject(PLATFORM_ID);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private consultaMovimiento?: MediaQueryList;
  private reintentoRegistrado = false;
  private maquinaActiva = false;
  private borrando = false;
  private posicionLetra = 0;
  private indicePalabra = 0;
  private temporizadorMaquina?: number;
  private frameParallax = 0;

  constructor() {
    if (!isPlatformBrowser(this.plataforma)) {
      return;
    }
    afterNextRender(() => {
      this.prepararMedio();
      this.prepararMaquina();
      this.prepararParallax();
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.plataforma)) {
      return;
    }
    this.consultaMovimiento?.removeEventListener('change', this.alCambiarMovimiento);
    window.removeEventListener('scroll', this.alHacerScrollParallax);
    cancelAnimationFrame(this.frameParallax);
    window.clearTimeout(this.temporizadorMaquina);
  }

  /* ==========================================================================
     Parallax del hero
     --------------------------------------------------------------------------
     El hero queda fijado (position: sticky) y la sección siguiente lo tapa.
     Este desplazamiento lo mueve hacia arriba más despacio que la página.
     ========================================================================== */

  private prepararParallax(): void {
    if (this.consultaMovimiento?.matches) {
      return;
    }
    window.addEventListener('scroll', this.alHacerScrollParallax, { passive: true });
    this.actualizarParallax();
  }

  private readonly alHacerScrollParallax = (): void => {
    if (this.frameParallax) {
      return;
    }
    this.frameParallax = requestAnimationFrame(() => {
      this.frameParallax = 0;
      this.actualizarParallax();
    });
  };

  private actualizarParallax(): void {
    const host = this.host.nativeElement;
    const recorrido = Math.min(window.scrollY, host.offsetHeight);
    host.style.setProperty('--desplazamiento-hero', `${-recorrido * 0.25}px`);
  }

  /* ==========================================================================
     Máquina de escribir del titular
     ========================================================================== */

  private prepararMaquina(): void {
    const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (movimientoReducido) {
      this.pintarPalabra(this.palabras[0]);
      return;
    }

    this.maquinaActiva = true;
    document.addEventListener('visibilitychange', () => {
      if (!this.maquinaActiva) {
        return;
      }
      if (document.hidden) {
        window.clearTimeout(this.temporizadorMaquina);
      } else {
        window.clearTimeout(this.temporizadorMaquina);
        this.temporizadorMaquina = window.setTimeout(() => this.escribir(), 180);
      }
    });
    this.escribir();
  }

  /** Pinta la palabra directamente en el DOM: el efecto no depende del ciclo de detección de cambios. */
  private pintarPalabra(texto: string): void {
    const nodo = this.palabraRef()?.nativeElement;
    if (nodo) {
      nodo.textContent = texto;
    }
  }

  private escribir(): void {
    if (!this.maquinaActiva) {
      return;
    }
    const objetivo = this.palabras[this.indicePalabra];

    if (!this.borrando) {
      this.posicionLetra += 1;
      this.pintarPalabra(objetivo.slice(0, this.posicionLetra));
      if (this.posicionLetra >= objetivo.length) {
        this.borrando = true;
        this.temporizadorMaquina = window.setTimeout(() => this.escribir(), 1100);
        return;
      }
      this.temporizadorMaquina = window.setTimeout(() => this.escribir(), 65);
      return;
    }

    this.posicionLetra -= 1;
    this.pintarPalabra(objetivo.slice(0, Math.max(0, this.posicionLetra)));
    if (this.posicionLetra <= 0) {
      this.borrando = false;
      this.indicePalabra = (this.indicePalabra + 1) % this.palabras.length;
      this.temporizadorMaquina = window.setTimeout(() => this.escribir(), 320);
      return;
    }
    this.temporizadorMaquina = window.setTimeout(() => this.escribir(), 32);
  }

  /**
   * El vídeo es una mejora progresiva: arranca en cuanto el póster (elemento
   * LCP) está listo, siempre que no haya movimiento reducido ni ahorro de datos.
   */
  private prepararMedio(): void {
    this.consultaMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.consultaMovimiento.addEventListener('change', this.alCambiarMovimiento);

    if (this.consultaMovimiento.matches) {
      return;
    }

    const conexion = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conexion?.saveData) {
      return;
    }

    const imagen = this.poster()?.nativeElement;
    const arrancar = (): void => this.cargarVideo();
    if (!imagen || imagen.complete) {
      arrancar();
      return;
    }
    imagen.addEventListener('load', arrancar, { once: true });
  }

  private cargarVideo(): void {
    const elemento = this.video()?.nativeElement;
    if (!elemento || elemento.src) {
      return;
    }

    const movil = window.matchMedia('(max-width: 47.99em)').matches;
    elemento.muted = true;
    elemento.preload = 'auto';
    elemento.addEventListener('playing', () => this.mostrarVideo(true), { once: true });
    elemento.src = movil ? '/video/hero-ambiente-640.mp4' : '/video/hero-ambiente-1280.mp4';
    void this.reproducir();
  }

  private async reproducir(): Promise<void> {
    const elemento = this.video()?.nativeElement;
    if (!elemento || !elemento.src) {
      return;
    }
    try {
      await elemento.play();
      this.mostrarVideo(true);
    } catch {
      this.reintentarConGesto(elemento);
    }
  }

  /** Si el navegador exige interacción, se reintenta con el primer gesto. */
  private reintentarConGesto(elemento: HTMLVideoElement): void {
    if (this.reintentoRegistrado) {
      return;
    }
    this.reintentoRegistrado = true;

    const reintentar = (): void => {
      void elemento
        .play()
        .then(() => this.mostrarVideo(true))
        .catch(() => undefined);
    };

    window.addEventListener('pointerdown', reintentar, { once: true, passive: true });
    window.addEventListener('keydown', reintentar, { once: true });
    window.addEventListener('scroll', reintentar, { once: true, passive: true });
  }

  private readonly alCambiarMovimiento = (evento: MediaQueryListEvent): void => {
    if (evento.matches) {
      this.maquinaActiva = false;
      window.clearTimeout(this.temporizadorMaquina);
      this.pintarPalabra(this.palabras[0]);
      cancelAnimationFrame(this.frameParallax);
      this.host.nativeElement.style.removeProperty('--desplazamiento-hero');
    } else {
      this.maquinaActiva = true;
      this.escribir();
      this.actualizarParallax();
    }

    const elemento = this.video()?.nativeElement;
    if (!elemento) {
      return;
    }
    if (evento.matches) {
      elemento.pause();
      this.mostrarVideo(false);
    } else if (elemento.src) {
      void this.reproducir();
    }
  };

  /**
   * Muestra u oculta el vídeo manipulando la clase directamente: así el fundido
   * no depende de la detección de cambios (estos listeners se registran tras el
   * primer render y no siempre disparan un ciclo de Angular).
   */
  private mostrarVideo(mostrar: boolean): void {
    this.video()?.nativeElement.classList.toggle('hero__video--visible', mostrar);
  }
}
