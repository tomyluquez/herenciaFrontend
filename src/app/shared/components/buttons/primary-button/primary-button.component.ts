import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css',
})
export class PrimaryButtonComponent {
  @Input() text!: string;
  @Input() isLoading: boolean = false;

  @Output() clicked: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  onClick() {
    this.clicked.emit(true);
  }
}
