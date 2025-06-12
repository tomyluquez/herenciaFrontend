import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItemsVM } from '../../Interfaces/Cart.interface';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { DiscountCouponComponent } from '../discount-coupon/discount-coupon.component';
import { DividerComponent } from '../../../../shared/components/divider/divider.component';
import { TableItemsCartComponent } from '../table-items-cart/table-items-cart.component';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';
import { CartService } from '../../Services/cart.service';
import { UserCartItemsVM } from '../../../User/Models/User.Cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, BlockUIModule, TableItemsCartComponent, CartSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  @BlockUI('main') mainBlockUI!: NgBlockUI
  @BlockUI('items-cart') itemsCartBlockUI!: NgBlockUI
  loadItems = true;
  cartId = 0

  private cartSubscription!: Subscription;
  cartItems: ICartItemsVM[] = [];

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
    this._cartService.getCartItemsByUserId().subscribe((res: UserCartItemsVM) => {
      if (!res.HasErrors || !res.HasWarnings) {
        this._cartService.updateCartItems();
      }
      this.loadItems = false;
      this.cartId = res.CartId;
      this.itemsCartBlockUI.stop();
    });
  }

  proceedToPayment() {
    //pasarle al endopint lo necesario para crear una nueva orden.
  }
}
