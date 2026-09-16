import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SchemaService {
  constructor(@Inject(DOCUMENT) private readonly documento: Document) {}

  establecer(id: string, datos: unknown): void {
    this.eliminar(id);
    const script = this.documento.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('id', id);
    script.textContent = JSON.stringify(datos);
    this.documento.head.appendChild(script);
  }

  eliminar(id: string): void {
    this.documento.getElementById(id)?.remove();
  }
}
