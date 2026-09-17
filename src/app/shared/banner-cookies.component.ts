import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../core/consent.service';

@Component({
  selector: 'app-banner-cookies',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './banner-cookies.component.html',
  styleUrl: './banner-cookies.component.scss',
})
export class BannerCookiesComponent {
  readonly consentimiento = inject(ConsentService);

  aceptar(): void {
    this.consentimiento.aceptar();
  }

  rechazar(): void {
    this.consentimiento.rechazar();
  }
}
