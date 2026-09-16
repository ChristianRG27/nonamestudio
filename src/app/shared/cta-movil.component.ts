import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../core/consent.service';

/**
 * CTA fijo inferior para móvil. Aparece tras superar el hero y se oculta al
 * llegar al final de la página para no tapar el pie ni sus enlaces. Mientras
 * el aviso de cookies está visible no se muestra, para no solaparse.
 */
@Component({
  selector: 'app-cta-movil',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cta-movil.component.html',
  styleUrl: './cta-movil.component.scss',
})
export class CtaMovilComponent implements OnDestroy {
  readonly consentimiento = inject(ConsentService);
  readonly visible = signal(false);

  private readonly zona = inject(NgZone);
  private limpiar?: () => void;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) {
      return;
    }

    afterNextRender(() => {
      let frame = 0;

      const actualizar = (): void => {
        frame = 0;
        const alto = window.innerHeight;
        const total = document.documentElement.scrollHeight;
        const pasadoHero = window.scrollY > alto * 0.8;
        const cercaDelFinal = window.scrollY + alto > total - 180;
        const mostrar = pasadoHero && !cercaDelFinal;
        // Los listeners se registran tras el render; el cambio se notifica
        // dentro de la zona para que Angular actualice la vista.
        this.zona.run(() => this.visible.set(mostrar));
      };

      const alDesplazar = (): void => {
        if (!frame) {
          frame = requestAnimationFrame(actualizar);
        }
      };

      actualizar();
      window.addEventListener('scroll', alDesplazar, { passive: true });
      window.addEventListener('resize', alDesplazar, { passive: true });

      this.limpiar = () => {
        window.removeEventListener('scroll', alDesplazar);
        window.removeEventListener('resize', alDesplazar);
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
