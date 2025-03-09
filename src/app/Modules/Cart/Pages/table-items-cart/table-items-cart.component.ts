import { Component, Input } from '@angular/core';
import { ICartItemsVM, UpdateQuantityCartItem } from '../../Interfaces/Cart.interface';
import { CommonModule } from '@angular/common';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { ActionCartItemEnum } from '../../Enums/action-cart-enum';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { AlertService } from '../../../Other/Services/alert.service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-table-items-cart',
  standalone: true,
  imports: [CommonModule, BlockUIModule],
  templateUrl: './table-items-cart.component.html',
  styleUrl: './table-items-cart.component.css'
})
export class TableItemsCartComponent {
  @BlockUI('table-items-cart') mainBlockUI!: NgBlockUI
  @Input() cartItems!: ICartItemsVM[]

  constructor(private _alertService: AlertService, private _cartService: CartService, private _router: Router) { }

  async changeQuantity(itemToUpdate: UpdateQuantityCartItem) {
    this.mainBlockUI.start("Agregando al carrito...");
    this._cartService.updateQuantityCartItem(itemToUpdate)
      .subscribe((res: ResponseMessages) => {
        this._alertService.showAlerts(res);
        this.mainBlockUI.stop();
      });
  }

  increment(itemId: number) {
    const item = this.getItem(1, itemId, ActionCartItemEnum.Add);
    this.changeQuantity(item);
  }

  decrement(itemId: number) {
    const item = this.getItem(1, itemId, ActionCartItemEnum.Substract);
    this.changeQuantity(item);
  }

  getItem(quantity: number, itemId: number, action: number): UpdateQuantityCartItem {
    return {
      Quantity: quantity,
      ItemId: itemId,
      Action: action
    }
  }

  async removeCartItem(itemId: number) {
    this.mainBlockUI.start("Quintado producto del carrito...");
    this._cartService.removeItemToCart(itemId).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      this.mainBlockUI.stop();
    });
  }
}
