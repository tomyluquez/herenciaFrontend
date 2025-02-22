import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { ICartItemsVM } from '../../interfaces/Cart.interface';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { DiscountCouponComponent } from './discount-coupon/discount-coupon.component';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { CardItemCartComponent } from './card-item-cart/card-item-cart.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, DiscountCouponComponent, BlockUIModule, DividerComponent, CardItemCartComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  @BlockUI('main') mainBlockUI!: NgBlockUI
  @BlockUI('items-cart') itemsCartBlockUI!: NgBlockUI
  loadItems = true;

  private cartSubscription!: Subscription;
  cartItems?: ICartItemsVM[];

  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.mainBlockUI.start('Cargado...');
    this.cartSubscription = this._cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.loadItems = false;
      this.mainBlockUI.stop();
    });
    this.getCartItems();
  }

  getCartItems() {
    this.itemsCartBlockUI.start('Cargando...');
    this._cartService.getCartItemsByUserId().subscribe((res) => {
      if (!res.HasErrors || !res.HasWarnings) {
        this._cartService.updateCartItems();
      }
      this.loadItems = false;
      this.itemsCartBlockUI.stop();
    });
  }
}
