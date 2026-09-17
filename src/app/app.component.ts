import { isPlatformBrowser } from '@angular/common';
import { Component, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AnalyticsService } from './core/analytics.service';
import { ScrollSuaveService } from './core/scroll-suave.service';
import { BannerCookiesComponent } from './shared/banner-cookies.component';
import { CabeceraComponent } from './shared/cabecera.component';
import { ChatbotComponent } from './shared/chatbot.component';
import { CtaMovilComponent } from './shared/cta-movil.component';
import { PieComponent } from './shared/pie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, PieComponent, BannerCookiesComponent, CtaMovilComponent, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly analitica = inject(AnalyticsService);
  private readonly scrollSuave = inject(ScrollSuaveService);

  constructor() {
    const plataforma = inject(PLATFORM_ID);

    if (isPlatformBrowser(plataforma)) {
      const router = inject(Router);

      router.events
        .pipe(
          filter((evento) => evento instanceof NavigationStart),
          takeUntilDestroyed(),
        )
        .subscribe((evento) => {
          const navegacion = evento as NavigationStart;
          const destino = navegacion.url.split('?')[0].split('#')[0];
          const origen = router.url.split('?')[0].split('#')[0];

          // Retroceder incluye el botón atrás del navegador y volver a la landing.
          const volviendoAlInicio = destino === '/' && origen !== '/';
          const atras = navegacion.navigationTrigger === 'popstate' || volviendoAlInicio;

          document.documentElement.classList.toggle('nav-atras', atras);
        });
    }

    afterNextRender(() => {
      this.scrollSuave.iniciar();

      document.addEventListener('click', (evento) => {
        const objetivo = evento.target as HTMLElement | null;
        const elemento = objetivo?.closest<HTMLElement>('[data-evento]');
        const nombre = elemento?.getAttribute('data-evento');
        if (nombre) {
          this.analitica.evento(nombre);
        }
      });
    });
  }
}
