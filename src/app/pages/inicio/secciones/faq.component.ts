import { Component } from '@angular/core';
import { RevelarDirective } from '../../../core/revelar.directive';
import { FAQS } from '../../../core/site.config';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RevelarDirective],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  readonly preguntas = FAQS;
}
