import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input() maxValue!: number;
  @Output() quantityEmit: EventEmitter<number> = new EventEmitter();
  quantity = 1;

  constructor() {}

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityEmit.emit(this.quantity);
    }
  }

  increment() {
    if (this.quantity < this.maxValue) {
      this.quantity++;
      this.quantityEmit.emit(this.quantity);
    }
  }
}
