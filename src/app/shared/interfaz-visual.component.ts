import { Component, input } from '@angular/core';

export type TipoInterfaz =
  | 'web'
  | 'landing'
  | 'tienda'
  | 'reservas'
  | 'crm'
  | 'panel'
  | 'automatizacion'
  | 'presupuesto';

/**
 * Interfaz ficticia y abstracta para adelantos y prototipos («Concepto»).
 * Es decorativa: el significado lo aporta el texto de la tarjeta.
 */
@Component({
  selector: 'app-interfaz-visual',
  standalone: true,
  template: `
    <svg
      class="interfaz"
      viewBox="0 0 320 200"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      @switch (tipo()) {
        @case ('web') {
          <rect x="16" y="14" width="288" height="172" rx="12" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.18" />
          <path d="M16 44h288" stroke="currentColor" stroke-opacity="0.12" />
          <circle cx="34" cy="29" r="3" fill="currentColor" fill-opacity="0.25" />
          <circle cx="46" cy="29" r="3" fill="currentColor" fill-opacity="0.25" />
          <circle cx="58" cy="29" r="3" fill="currentColor" fill-opacity="0.25" />
          <rect x="36" y="66" width="126" height="10" rx="5" fill="currentColor" fill-opacity="0.35" />
          <rect x="36" y="86" width="152" height="7" rx="3.5" fill="currentColor" fill-opacity="0.15" />
          <rect x="36" y="100" width="120" height="7" rx="3.5" fill="currentColor" fill-opacity="0.15" />
          <rect class="latido" x="36" y="128" width="92" height="24" rx="7" fill="#ff9b73" fill-opacity="0.8" />
          <rect x="208" y="66" width="80" height="86" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="222" y="82" width="52" height="7" rx="3.5" fill="currentColor" fill-opacity="0.18" />
          <rect x="222" y="98" width="52" height="7" rx="3.5" fill="currentColor" fill-opacity="0.12" />
          <rect x="222" y="126" width="34" height="14" rx="5" fill="#ff9b73" fill-opacity="0.7" />
        }
        @case ('landing') {
          <rect x="16" y="14" width="288" height="172" rx="12" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.18" />
          <rect x="96" y="34" width="128" height="12" rx="6" fill="currentColor" fill-opacity="0.35" />
          <rect x="72" y="56" width="176" height="7" rx="3.5" fill="currentColor" fill-opacity="0.15" />
          <rect x="56" y="82" width="208" height="28" rx="8" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="56" y="118" width="208" height="28" rx="8" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect class="latido" x="118" y="156" width="84" height="24" rx="7" fill="#ff9b73" fill-opacity="0.8" />
          <rect x="24" y="34" width="52" height="16" rx="8" fill="#ff9b73" fill-opacity="0.25" />
        }
        @case ('tienda') {
          <rect x="16" y="14" width="288" height="172" rx="12" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.18" />
          <rect x="36" y="32" width="88" height="9" rx="4.5" fill="currentColor" fill-opacity="0.3" />
          <rect x="236" y="28" width="48" height="18" rx="9" fill="#ff9b73" fill-opacity="0.75" />
          <rect x="36" y="58" width="84" height="70" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="130" y="58" width="84" height="70" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="224" y="58" width="58" height="70" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="46" y="70" width="64" height="34" rx="6" fill="currentColor" fill-opacity="0.10" />
          <rect x="140" y="70" width="64" height="34" rx="6" fill="currentColor" fill-opacity="0.10" />
          <rect x="46" y="112" width="40" height="6" rx="3" fill="currentColor" fill-opacity="0.18" />
          <rect x="140" y="112" width="40" height="6" rx="3" fill="currentColor" fill-opacity="0.18" />
          <rect x="36" y="146" width="246" height="24" rx="8" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="48" y="154" width="80" height="8" rx="4" fill="currentColor" fill-opacity="0.16" />
          <rect class="latido" x="216" y="152" width="54" height="12" rx="6" fill="#ff9b73" fill-opacity="0.7" />
        }
        @case ('reservas') {
          <rect x="16" y="14" width="288" height="172" rx="12" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.18" />
          <rect x="34" y="32" width="76" height="9" rx="4.5" fill="currentColor" fill-opacity="0.3" />
          <rect x="34" y="58" width="44" height="38" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.14" />
          <rect class="latido-suave" x="88" y="58" width="44" height="38" rx="8" fill="#ff9b73" fill-opacity="0.18" stroke="#ff9b73" stroke-opacity="0.5" />
          <rect x="142" y="58" width="44" height="38" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.14" />
          <rect x="196" y="58" width="44" height="38" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.14" />
          <rect x="250" y="58" width="34" height="38" rx="8" fill="currentColor" fill-opacity="0.06" stroke="currentColor" stroke-opacity="0.14" />
          <rect x="34" y="112" width="152" height="8" rx="4" fill="currentColor" fill-opacity="0.16" />
          <rect x="34" y="130" width="120" height="8" rx="4" fill="currentColor" fill-opacity="0.10" />
          <rect x="34" y="156" width="104" height="22" rx="7" fill="#ff9b73" fill-opacity="0.8" />
          <circle cx="262" cy="128" r="24" fill="none" stroke="currentColor" stroke-opacity="0.18" />
          <path d="M262 114v14l10 6" stroke="currentColor" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" />
        }
        @case ('crm') {
          <rect x="16" y="14" width="288" height="172" rx="12" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.18" />
          <rect x="34" y="30" width="64" height="8" rx="4" fill="currentColor" fill-opacity="0.28" />
          <rect x="34" y="52" width="80" height="112" rx="9" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="122" y="52" width="80" height="112" rx="9" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="210" y="52" width="76" height="112" rx="9" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="44" y="66" width="60" height="26" rx="7" fill="currentColor" fill-opacity="0.08" />
          <rect class="latido-suave" x="132" y="66" width="60" height="26" rx="7" fill="#ff9b73" fill-opacity="0.22" stroke="#ff9b73" stroke-opacity="0.5" />
          <rect x="132" y="100" width="60" height="26" rx="7" fill="currentColor" fill-opacity="0.08" />
          <rect x="220" y="66" width="56" height="26" rx="7" fill="currentColor" fill-opacity="0.08" />
          <rect x="44" y="140" width="42" height="8" rx="4" fill="currentColor" fill-opacity="0.14" />
          <rect x="132" y="140" width="42" height="8" rx="4" fill="currentColor" fill-opacity="0.14" />
          <rect x="220" y="140" width="42" height="8" rx="4" fill="currentColor" fill-opacity="0.14" />
        }
        @case ('panel') {
          <rect x="16" y="14" width="288" height="172" rx="12" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.18" />
          <rect x="34" y="30" width="72" height="8" rx="4" fill="currentColor" fill-opacity="0.28" />
          <rect x="34" y="52" width="76" height="44" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="122" y="52" width="76" height="44" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="210" y="52" width="76" height="44" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="46" y="64" width="34" height="10" rx="5" fill="currentColor" fill-opacity="0.3" />
          <rect x="134" y="64" width="34" height="10" rx="5" fill="currentColor" fill-opacity="0.3" />
          <rect x="222" y="64" width="34" height="10" rx="5" fill="currentColor" fill-opacity="0.3" />
          <rect x="46" y="80" width="50" height="6" rx="3" fill="currentColor" fill-opacity="0.12" />
          <rect x="134" y="80" width="50" height="6" rx="3" fill="currentColor" fill-opacity="0.12" />
          <rect x="222" y="80" width="50" height="6" rx="3" fill="currentColor" fill-opacity="0.12" />
          <rect x="34" y="112" width="252" height="60" rx="9" fill="currentColor" fill-opacity="0.04" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="52" y="152" width="26" height="8" rx="4" fill="currentColor" fill-opacity="0.16" />
          <rect x="88" y="138" width="26" height="22" rx="4" fill="currentColor" fill-opacity="0.16" />
          <rect class="crecer" x="124" y="126" width="26" height="34" rx="4" fill="#ff9b73" fill-opacity="0.7" />
          <rect x="160" y="144" width="26" height="16" rx="4" fill="currentColor" fill-opacity="0.16" />
          <rect x="196" y="120" width="26" height="40" rx="4" fill="#ff9b73" fill-opacity="0.55" />
          <rect x="232" y="134" width="26" height="26" rx="4" fill="currentColor" fill-opacity="0.16" />
        }
        @case ('automatizacion') {
          <rect x="16" y="14" width="288" height="172" rx="12" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.18" />
          <rect x="34" y="44" width="72" height="40" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <rect x="124" y="98" width="72" height="40" rx="9" fill="#ff9b73" fill-opacity="0.16" stroke="#ff9b73" stroke-opacity="0.45" />
          <rect x="214" y="44" width="72" height="40" rx="9" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.12" />
          <path d="M106 64h18c8 0 8 54 8 54s0-54 8-54h-8" stroke="currentColor" stroke-opacity="0.2" />
          <path d="M196 118h18" stroke="currentColor" stroke-opacity="0.2" />
          <path d="M70 64h0" stroke="#ff9b73" />
          <rect x="46" y="60" width="40" height="8" rx="4" fill="currentColor" fill-opacity="0.22" />
          <rect class="progreso" x="136" y="114" width="40" height="8" rx="4" fill="#ff9b73" fill-opacity="0.7" />
          <rect x="226" y="60" width="40" height="8" rx="4" fill="currentColor" fill-opacity="0.22" />
          <rect x="34" y="152" width="252" height="18" rx="9" fill="currentColor" fill-opacity="0.05" />
          <rect x="42" y="157" width="118" height="8" rx="4" fill="currentColor" fill-opacity="0.16" />
          <rect x="248" y="156" width="30" height="10" rx="5" fill="#ff9b73" fill-opacity="0.7" />
        }
        @case ('presupuesto') {
          <rect x="16" y="14" width="288" height="172" rx="12" fill="currentColor" fill-opacity="0.03" stroke="currentColor" stroke-opacity="0.18" />
          <rect x="84" y="28" width="152" height="152" rx="10" fill="currentColor" fill-opacity="0.05" stroke="currentColor" stroke-opacity="0.14" />
          <rect x="100" y="48" width="86" height="9" rx="4.5" fill="currentColor" fill-opacity="0.3" />
          <rect x="100" y="70" width="120" height="7" rx="3.5" fill="currentColor" fill-opacity="0.14" />
          <rect x="100" y="86" width="104" height="7" rx="3.5" fill="currentColor" fill-opacity="0.14" />
          <rect x="100" y="102" width="112" height="7" rx="3.5" fill="currentColor" fill-opacity="0.14" />
          <rect x="100" y="130" width="60" height="10" rx="5" fill="currentColor" fill-opacity="0.24" />
          <rect x="100" y="152" width="76" height="18" rx="6" fill="#ff9b73" fill-opacity="0.75" />
          <path class="latido" d="M52 84v28M38 98h28M42 88l20 20M62 88l-20 20" stroke="#ff9b73" stroke-opacity="0.85" stroke-width="2" stroke-linecap="round" />
          <rect x="34" y="132" width="44" height="16" rx="8" fill="currentColor" fill-opacity="0.08" />
        }
      }
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .interfaz {
        display: block;
        width: 100%;
        height: auto;
      }

      .latido {
        animation: interfaz-latido 3.2s ease-in-out infinite;
      }

      .latido-suave {
        animation: interfaz-latido 4.6s ease-in-out infinite;
        animation-delay: 0.6s;
      }

      .progreso {
        transform-box: fill-box;
        transform-origin: left center;
        animation: interfaz-progreso 5.2s ease-in-out infinite;
      }

      .crecer {
        transform-box: fill-box;
        transform-origin: center bottom;
        animation: interfaz-crecer 5.2s ease-in-out infinite;
      }

      @keyframes interfaz-latido {
        0%,
        100% {
          opacity: 1;
        }

        50% {
          opacity: 0.5;
        }
      }

      @keyframes interfaz-progreso {
        0%,
        100% {
          transform: scaleX(0.62);
        }

        50% {
          transform: scaleX(1);
        }
      }

      @keyframes interfaz-crecer {
        0%,
        100% {
          transform: scaleY(0.78);
        }

        50% {
          transform: scaleY(1);
        }
      }
    `,
  ],
})
export class InterfazVisualComponent {
  readonly tipo = input.required<TipoInterfaz>();
}
