import { Component, Input } from '@angular/core';
import { CounterComponent } from '../../../shared/components/counter/counter.component';
import { ICartItemsVM } from '../../../interfaces/Cart.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-item-cart',
  standalone: true,
  imports: [CounterComponent, CommonModule],
  templateUrl: './card-item-cart.component.html',
  styleUrl: './card-item-cart.component.css'
})
export class CardItemCartComponent {
  @Input() cartItem!: ICartItemsVM

  constructor() { }

  changeQuantity(quantity: number) {

  }

  removeCartItem(id: number) {

  }
}
