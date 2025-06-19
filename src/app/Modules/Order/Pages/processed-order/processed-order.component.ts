import { Component, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../../Other/Services/modal.service';

@Component({
  selector: 'app-processed-order',
  standalone: true,
  imports: [],
  templateUrl: './processed-order.component.html',
  styleUrl: './processed-order.component.css'
})
export class ProcessedOrderComponent {
  @Input() orderNumber!: number;

  constructor(private _router: Router, private _modalService: ModalService) { }

  goToOrderStatus() {
    this._modalService.closeModal();
    this._router.navigate([`Order/order-status/${this.orderNumber}`]);
  }

  goToProducts() {
    this._modalService.closeModal();
    this._router.navigate(['/Products']);
  }
}
