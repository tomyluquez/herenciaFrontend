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
  @Input() maxValue: number = 100;
  @Input() showDisponibility: boolean = true;
  @Input() quantity = 1;
  @Output() quantityEmit: EventEmitter<number> = new EventEmitter();

  constructor() { }

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
