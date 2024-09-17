import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shadow-bg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shadow-bg.component.html',
  styleUrl: './shadow-bg.component.css',
})
export class ShadowBgComponent {
  @Input() isOpen = false;
}
