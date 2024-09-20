import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DividerComponent } from '../../divider/divider.component';

@Component({
  selector: 'app-cart-dropdown',
  standalone: true,
  imports: [CommonModule, DividerComponent],
  templateUrl: './cart-dropdown.component.html',
  styleUrl: '../dropdown.css',
})
export class CartDropdownComponent {
  @Input({ required: true }) isOpen = false;
  @Input({ required: true }) isLoggin = false;
}
