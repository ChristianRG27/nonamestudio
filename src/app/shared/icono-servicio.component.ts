import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icono-servicio',
  standalone: true,
  template: `
    <svg
      class="icono"
      viewBox="0 0 32 32"
      width="32"
      height="32"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @switch (nombre()) {
        @case ('browser') {
          <rect x="4" y="6" width="24" height="20" rx="2.5" />
          <path d="M4 12h24" />
          <circle cx="8.5" cy="9" r="0.9" fill="currentColor" stroke="none" />
          <circle cx="12" cy="9" r="0.9" fill="currentColor" stroke="none" />
        }
        @case ('target') {
          <circle cx="16" cy="16" r="10.5" />
          <circle cx="16" cy="16" r="5.5" />
          <circle cx="16" cy="16" r="1.6" fill="currentColor" stroke="none" />
        }
        @case ('cart') {
          <path d="M4.5 8.5h3l2.6 11h11.3l2.4-7.5H9" />
          <circle cx="12" cy="24.5" r="1.7" />
          <circle cx="21" cy="24.5" r="1.7" />
        }
        @case ('utensils') {
          <path d="M11.5 5v6.5a2.5 2.5 0 0 0 5 0V5" />
          <path d="M14 14v13" />
          <path d="M21.5 5c1.8 2.2 2.5 5 2.5 8h-2.5" />
          <path d="M21.5 13v14" />
        }
        @case ('layers') {
          <path d="M16 4.5 5.5 10.5 16 16.5l10.5-6L16 4.5Z" />
          <path d="M5.5 16.5 16 22.5l10.5-6" />
          <path d="M5.5 22 16 28l10.5-6" />
        }
        @case ('spark') {
          <path d="M16 4v7" />
          <path d="M16 21v7" />
          <path d="M4 16h7" />
          <path d="M21 16h7" />
          <path d="M8.5 8.5 13 13" />
          <path d="M19 19l4.5 4.5" />
          <path d="M23.5 8.5 19 13" />
          <path d="M13 19l-4.5 4.5" />
        }
      }
    </svg>
  `,
  styles: [
    `
      :host {
        display: inline-flex;
      }

      .icono {
        color: var(--acento);
      }
    `,
  ],
})
export class IconoServicioComponent {
  readonly nombre = input.required<
    'browser' | 'target' | 'cart' | 'utensils' | 'layers' | 'spark'
  >();
}
