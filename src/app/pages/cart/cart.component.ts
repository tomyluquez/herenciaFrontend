import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';
import { ICartItemsVM } from '../../interfaces/Cart.interface';
import { CardSkeletonComponent } from '../../shared/components/loaders/card-skeleton/card-skeleton.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  loadItems = true;

  private cartSubscription!: Subscription;
  cartItems?: ICartItemsVM[];

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this.blockUI.start('Cargado...');
    this.cartSubscription = this._cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.loadItems = false;
    });
    this.getCartItems();
  }

  getCartItems() {
    this._cartService.getCartItemsByUserId().subscribe((res) => {
      if (!res.HasErrors || !res.HasWarnings) {
        this._cartService.updateCartItems();
      }
      this.loadItems = false;
      this.blockUI.stop();
    });
  }
}
