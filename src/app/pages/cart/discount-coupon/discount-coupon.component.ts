import { Component, EventEmitter, input, Output } from '@angular/core';
import { InputTextComponent } from '../../../shared/components/Inputs/input-text/input-text.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-discount-coupon',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './discount-coupon.component.html',
  styleUrl: './discount-coupon.component.css'
})
export class DiscountCouponComponent {
  coupon!: string;

  @Output() couponEmit = new EventEmitter<string>();

  constructor() { }

  addCoupon() {
    //Llamar al servicio para ver si existe o esta activo el cupon de descuento-
    // si el cupon esta disponible, enviarle al padre el descuento.

  }
}
