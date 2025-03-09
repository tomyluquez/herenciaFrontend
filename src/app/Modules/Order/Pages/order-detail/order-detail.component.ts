import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { OrderService } from '../../Services/order.service';
import { IOrderDetail } from '../../Interface/order-detail.interface';
import { OrderDetail } from '../../Models/Order-detail.model';
import { AlertService } from '../../../Other/Services/alert.service';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [BlockUIModule, CommonModule],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.css'
})
export class OrderDetailComponent implements OnInit, OnChanges {
  @BlockUI('order-detail') blockUI!: NgBlockUI
  @Input() orderId!: number;
  orderDetail!: IOrderDetail

  constructor(private _orderService: OrderService, private _alertService: AlertService) { }

  ngOnInit() {
    this.search()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['orderId'].firstChange) {
      this.orderId = changes['orderId'].currentValue;
      this.search()
    }
  }

  search() {
    this.blockUI.start("Cargando...")
    this._orderService.getOrderDetailById(this.orderId).subscribe((res: OrderDetail) => {
      this._alertService.showAlerts(res);
      if (res.HasErrors) {
        this.blockUI.stop();
        return;
      }

      this.orderDetail = res.Items
      this.blockUI.stop();
    })
  }

}
