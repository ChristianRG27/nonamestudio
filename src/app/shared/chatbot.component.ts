import { Component, ElementRef, HostListener, ViewChild, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ConsentService } from '../core/consent.service';
import { SITE, esDatoPendiente } from '../core/site.config';

type Paso = 'servicio' | 'detalle' | 'contacto';

const OPCIONES = [
  { titulo: 'Una web que me represente', detalle: 'Diseño, claridad y nuevos clientes', icono: 'M3 5h18v14H3z M3 9h18 M7 7h.01 M10 7h.01' },
  { titulo: 'Vender online', detalle: 'Una tienda fácil de comprar y gestionar', icono: 'M3 3h2l3 12h10l3-9H6 M9 20h.01 M18 20h.01' },
  { titulo: 'Simplificar mi negocio', detalle: 'CRM, automatización e inteligencia artificial', icono: 'M4 4h6v6H4z M14 14h6v6h-6z M14 7h3v4 M7 14v3h4' },
  { titulo: 'Tengo otra idea', detalle: 'Te ayudamos a darle forma', icono: 'M9 18h6 M10 21h4 M8 14a6 6 0 1 1 8 0l-1 2H9z' },
] as const;

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss',
})
export class ChatbotComponent {
  @ViewChild('lanzador') private lanzador?: ElementRef<HTMLButtonElement>;
  @ViewChild('titulo') private titulo?: ElementRef<HTMLElement>;

  readonly consentimiento = inject(ConsentService);
  readonly opciones = OPCIONES;
  readonly abierto = signal(false);
  readonly paso = signal<Paso>('servicio');
  readonly servicio = signal('');
  readonly detalle = signal('');
  readonly direccion = signal<'adelante' | 'atras'>('adelante');
  readonly numeroPaso = computed(() => ({ servicio: 1, detalle: 2, contacto: 3 })[this.paso()]);
  readonly ejemplo = computed(() => ({
    'Una web que me represente': 'Por ejemplo: quiero renovar la web de mi estudio y recibir más consultas.',
    'Vender online': 'Por ejemplo: quiero vender mis productos y gestionar los pedidos en un solo lugar.',
    'Simplificar mi negocio': 'Por ejemplo: dedico muchas horas a tareas que me gustaría automatizar.',
    'Tengo otra idea': 'Por ejemplo: tengo un proyecto en mente y necesito ayuda para empezar.',
  } as Record<string, string>)[this.servicio()] ?? 'Cuéntanos qué tienes en mente.');
  readonly whatsappDisponible = !esDatoPendiente(SITE.whatsapp) && !!SITE.whatsapp.replace(/\D/g, '');
  readonly emailDisponible = !esDatoPendiente(SITE.email) && !!SITE.email.trim();

  private readonly mensaje = computed(() => {
    const detalle = this.detalle().trim();
    return `Hola, os escribo desde la web de ${SITE.marca}.\nMe interesa: ${this.servicio()}.\n${detalle ? `Mi proyecto: ${detalle}` : 'Me gustaría contaros mi proyecto.'}`;
  });

  readonly enlaceWhatsapp = computed(() =>
    `https://wa.me/${SITE.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(this.mensaje())}`,
  );
  readonly enlaceEmail = computed(() =>
    `mailto:${SITE.email}?subject=${encodeURIComponent(`Consulta sobre ${this.servicio()} — ${SITE.marca}`)}&body=${encodeURIComponent(this.mensaje())}`,
  );

  abrir(): void {
    this.abierto.set(true);
    this.enfocarTitulo();
  }

  cerrar(): void {
    this.abierto.set(false);
    setTimeout(() => this.lanzador?.nativeElement.focus());
  }

  elegir(servicio: string): void {
    this.servicio.set(servicio);
    this.direccion.set('adelante');
    this.paso.set('detalle');
    this.enfocarTitulo();
  }

  actualizarDetalle(evento: Event): void {
    this.detalle.set((evento.target as HTMLTextAreaElement).value);
  }

  continuar(): void {
    this.direccion.set('adelante');
    this.paso.set('contacto');
    this.enfocarTitulo();
  }

  volver(): void {
    this.direccion.set('atras');
    this.paso.set(this.paso() === 'contacto' ? 'detalle' : 'servicio');
    this.enfocarTitulo();
  }

  reiniciar(): void {
    this.direccion.set('atras');
    this.servicio.set('');
    this.detalle.set('');
    this.paso.set('servicio');
    this.enfocarTitulo();
  }

  @HostListener('document:keydown.escape')
  alPulsarEscape(): void {
    if (this.abierto()) this.cerrar();
  }

  private enfocarTitulo(): void {
    setTimeout(() => this.titulo?.nativeElement.focus());
  }
}
