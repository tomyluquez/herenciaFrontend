import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() loading = true;
  @Input() title!: string;
  @Input() image?: string;
  @Input() subtitle?: string;
  @Input() price?: number;
  @Input() promotionalPrice?: number;

  constructor() { }
}
