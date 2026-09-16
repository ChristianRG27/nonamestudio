import { DOCUMENT, PlatformLocation, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ScrollSuaveService } from '../core/scroll-suave.service';
import { NAVEGACION, SITE } from '../core/site.config';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.scss',
})
export class CabeceraComponent {
  readonly marca = SITE.marca;
  readonly menuAbierto = signal(false);
  readonly progreso = signal(0);

  /** Vidrio oscuro cuando la sección de debajo es oscura o el menú está abierto. */
  readonly tonoOscuro = signal(true);

  readonly servicios = NAVEGACION.find((item) => item.ruta === '/servicios')?.hijos ?? [];
  readonly estudio = NAVEGACION.filter((item) =>
    ['/proceso', '/recursos', '/sobre'].includes(item.ruta),
  );
  readonly enlacesEscritorio = [{ etiqueta: 'Proyectos', ruta: '/proyectos' }];
  readonly enlacesMenu = [
    { etiqueta: 'Servicios', ruta: '/servicios' },
    { etiqueta: 'Proyectos', ruta: '/proyectos' },
    { etiqueta: 'IA', ruta: '/servicios/ia-automatizacion' },
    { etiqueta: 'Contacto', ruta: '/contacto' },
  ];

  private readonly documento = inject(DOCUMENT);
  private readonly plataforma = inject(PLATFORM_ID);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly scrollSuave = inject(ScrollSuaveService);
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly botonMenu = viewChild<ElementRef<HTMLButtonElement>>('botonMenu');
  private secciones: HTMLElement[] = [];
  private frame = 0;

  constructor() {
    const router = inject(Router);
    const ubicacion = inject(PlatformLocation);
    this.tonoOscuro.set(ubicacion.pathname === '/');

    router.events
      .pipe(
        filter((evento) => evento instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => {
        this.cerrarMenu();
        if (isPlatformBrowser(this.plataforma)) {
          setTimeout(() => {
            this.recogerSecciones();
            this.actualizarTono();
          });
        }
      });

    if (isPlatformBrowser(this.plataforma)) {
      afterNextRender(() => {
        this.recogerSecciones();
        this.actualizarTono();
      });
    }
  }

  alternarMenu(): void {
    this.establecerMenu(!this.menuAbierto());
  }

  cerrarMenu(): void {
    this.establecerMenu(false);
  }

  @HostListener('window:scroll')
  alHacerScroll(): void {
    if (this.frame) {
      return;
    }
    this.frame = requestAnimationFrame(() => {
      this.frame = 0;
      this.actualizarProgreso();
    });
  }

  @HostListener('document:keydown.escape')
  alPulsarEscape(): void {
    if (this.menuAbierto()) {
      this.cerrarMenu();
    }
  }

  alPulsarTab(evento: KeyboardEvent): void {
    if (evento.key !== 'Tab' || !this.menuAbierto()) {
      return;
    }

    const focos = Array.from(
      this.host.nativeElement.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
    ).filter((elemento) => elemento.offsetParent !== null);

    if (focos.length === 0) {
      return;
    }

    const primero = focos[0];
    const ultimo = focos[focos.length - 1];
    const activo = this.documento.activeElement as HTMLElement | null;
    const dentro = activo ? this.host.nativeElement.contains(activo) : false;

    if (evento.shiftKey && (activo === primero || !dentro)) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && activo === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }

  private actualizarProgreso(): void {
    const recorrido = this.documento.documentElement.scrollHeight - window.innerHeight;
    const valor = recorrido > 0 ? Math.min(1, Math.max(0, window.scrollY / recorrido)) : 0;
    this.progreso.set(Math.round(valor * 1000) / 1000);
    this.actualizarTono();
  }

  private recogerSecciones(): void {
    this.secciones = Array.from(
      this.documento.querySelectorAll<HTMLElement>('.hero, .seccion, .pagina, .pie'),
    );
  }

  /** Mira qué sección queda detrás de la cápsula y ajusta el vidrio. */
  private actualizarTono(): void {
    const y = 48;
    for (let i = this.secciones.length - 1; i >= 0; i -= 1) {
      const seccion = this.secciones[i];
      const caja = seccion.getBoundingClientRect();
      if (caja.top <= y && caja.bottom > y) {
        this.tonoOscuro.set(seccion.matches('.hero, .seccion--oscura, .seccion--noche'));
        return;
      }
    }
    this.tonoOscuro.set(false);
  }

  private establecerMenu(abierto: boolean): void {
    if (!isPlatformBrowser(this.plataforma) || abierto === this.menuAbierto()) {
      return;
    }

    const estabaAbierto = this.menuAbierto();
    this.menuAbierto.set(abierto);
    this.documento.documentElement.classList.toggle('menu-abierto', abierto);

    if (abierto) {
      this.scrollSuave.detener();
      setTimeout(() => this.panel()?.nativeElement.querySelector<HTMLElement>('a[href]')?.focus());
    } else {
      this.scrollSuave.reanudar();
      if (estabaAbierto) {
        setTimeout(() => this.botonMenu()?.nativeElement.focus());
      }
    }
  }
}
