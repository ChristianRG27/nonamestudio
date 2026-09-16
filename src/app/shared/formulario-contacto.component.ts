import { Component, inject, input, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../core/analytics.service';
import { ContactoService } from '../core/contacto.service';
import { SITE, esDatoPendiente } from '../core/site.config';

type EstadoEnvio = 'inicial' | 'enviando' | 'ok' | 'mailto' | 'error';

type Campo =
  | 'nombre'
  | 'empresa'
  | 'email'
  | 'telefono'
  | 'mensaje'
  | 'presupuesto'
  | 'privacidad';

@Component({
  selector: 'app-formulario-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-contacto.component.html',
  styleUrl: './formulario-contacto.component.scss',
})
export class FormularioContactoComponent {
  readonly origen = input('la web');
  readonly marca = SITE.marca;
  readonly plazo = SITE.plazoRespuesta;
  readonly emailContacto = SITE.email;
  readonly emailPendiente = esDatoPendiente(SITE.email);
  readonly estado = signal<EstadoEnvio>('inicial');

  private readonly enviado = signal(false);
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly contacto = inject(ContactoService);
  private readonly analitica = inject(AnalyticsService);

  readonly formulario = this.fb.group({
    nombre: ['', [Validators.required, Validators.maxLength(80)]],
    empresa: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.pattern(/^[+()0-9\s.-]{6,20}$/)]],
    mensaje: ['', [Validators.required, Validators.maxLength(1200)]],
    presupuesto: ['', [Validators.maxLength(120)]],
    privacidad: [false, [Validators.requiredTrue]],
  });

  campo(nombre: Campo) {
    return this.formulario.controls[nombre];
  }

  invalido(nombre: Campo): boolean {
    const control = this.campo(nombre);
    return control.invalid && (control.touched || this.enviado());
  }

  async enviar(): Promise<void> {
    this.enviado.set(true);
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.estado.set('enviando');
    const valores = this.formulario.getRawValue();
    const resultado = await this.contacto.enviar({
      nombre: valores.nombre,
      empresa: valores.empresa,
      email: valores.email,
      telefono: valores.telefono || undefined,
      mensaje: valores.mensaje,
      presupuesto: valores.presupuesto || undefined,
      origen: this.origen(),
    });

    if (resultado === 'api') {
      this.analitica.evento('contact_form_submit', { origen: this.origen(), metodo: 'api' });
      this.estado.set('ok');
      this.enviado.set(false);
      this.formulario.reset();
    } else if (resultado === 'mailto') {
      this.analitica.evento('contact_form_submit', { origen: this.origen(), metodo: 'mailto' });
      this.estado.set('mailto');
    } else {
      this.estado.set('error');
    }
  }
}
