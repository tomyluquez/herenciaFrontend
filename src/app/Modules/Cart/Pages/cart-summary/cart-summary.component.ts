import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ICartItemsVM } from '../../Interfaces/Cart.interface';
import { DiscountCouponComponent } from '../discount-coupon/discount-coupon.component';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../shared/components/divider/divider.component';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [DiscountCouponComponent, CommonModule, DividerComponent],
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.css'
})
export class CartSummaryComponent implements OnInit, OnChanges {
  @Input() cartItems!: ICartItemsVM[]

  subtotal = 0;
  shippingCost = 1000;
  discount = 0;
  discountPercentage = 0;
  total = 0;

  constructor() { }

  ngOnInit() {
    this.fillSubtotals();
  }

  ngOnChanges(): void {
    this.fillSubtotals();
  }

  fillSubtotals() {
    if (this.cartItems && this.cartItems.length > 0) {
      this.subtotal = 0;
      for (let item of this.cartItems) {
        this.subtotal += item.Price * item.Quantity;
      };
      //agregar el valor del costo de envio
      this.total = this.fillTotal();
    } else {
      this.subtotal = 0;
      this.discount = 0;
      this.total = 0;
    }
  }

  fillTotal(): number {
    return this.subtotal + this.shippingCost
  }

  applyDiscount(percentage: number): void {
    this.discountPercentage = percentage;
    this.discount = (this.subtotal + this.shippingCost) * percentage / 100;
    this.total = this.fillTotal() - this.discount;
  }

  removeDiscount() {
    this.discount = 0;
    this.discountPercentage = 0;
    this.total = this.fillTotal();
  }

  proceedToPayment() {
    //pasarle al endopint lo necesario para crear una nueva orden.
  }
}
