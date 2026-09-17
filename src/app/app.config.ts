import { DOCUMENT } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withViewTransitions,
} from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition }) => {
          // El nombre de transición de la cabecera solo se activa aquí para no
          // romper el backdrop-filter (vidrio) del header.
          const documento = inject(DOCUMENT);
          documento.documentElement.classList.add('transicionando');
          void transition.finished.finally(() => {
            documento.documentElement.classList.remove('transicionando');
          });
        },
      }),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
    provideClientHydration(),
    provideHttpClient(),
  ],
};
