import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DividerComponent } from '../../divider/divider.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../Modules/Auth/Services/auth.service';
import { ICartItemsVM } from '../../../../Modules/Cart/Interfaces/Cart.interface';
import { Subscription } from 'rxjs';
import { CartService } from '../../../../Modules/Cart/Services/cart.service';
import { AlertService } from '../../../../Modules/Other/Services/alert.service';

@Component({
  selector: 'app-cart-dropdown',
  standalone: true,
  imports: [CommonModule, DividerComponent, RouterModule],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: '../dropdown.css',
})
export class CartDropdownComponent implements OnInit {
  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) isLoggin = false;
  @Output() quantityItems = new EventEmitter<number>();

  loadItems = true;

  cartItems?: ICartItemsVM[];

  private cartSubscription!: Subscription;

  constructor(
    private _router: Router,
    private _cartService: CartService,
    private _alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.cartSubscription = this._cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.loadItems = false;

      this.quantityItems.emit(items.reduce((acc, i) => acc + (i.Quantity || 0), 0));
    });
    this.getCartItems();
  }

  redirectLogin() {
    this.isOpen = false;
    this._router.navigate(['/Login']);
  }

  getCartItems() {
    this._cartService.getCartItemsByUserId().subscribe((res) => {
      if (!res.HasErrors || !res.HasWarnings) {
        this._cartService.updateCartItems();
      }
      this.loadItems = false;
    });
  }

  removeCartItem(itemId: number) {
    this._cartService.removeItemToCart(itemId).subscribe((res) => {
      this._alertService.showAlerts(res);
      if (!res.HasErrors || !res.HasWarnings) {
        this._cartService.updateCartItems();
      }
    });
  }

  seeCart() {
    this.isOpen = false;
    this._router.navigate(['/Cart']);
  }
}
