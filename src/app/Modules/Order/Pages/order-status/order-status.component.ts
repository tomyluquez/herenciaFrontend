import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { OrderService } from '../../Services/order.service';
import { OrderDetail } from '../../Models/Order-detail.model';
import { IOrderDetail } from '../../Interface/order-detail.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderStatusEnum } from '../../Enums/order-status-enum';
import { getOrderStatusClassById } from '../../Helpers/order-status.helper';

@Component({
  selector: 'app-order-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-status.component.html',
  styleUrl: './order-status.component.css'
})
export class OrderStatusComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  order!: IOrderDetail;
  loading = true;

  constructor(private orderService: OrderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.blockUI.start();

    // Obtener orderId de la URL
    this.route.params.subscribe(params => {
      const orderNumber = params['orderNumber'];

      if (orderNumber) {
        this.loadOrderDetails(orderNumber);
      } else {
        this.blockUI.stop();
        // Manejar caso cuando no hay orderNumber en la URL
        console.error('No se encontró orderNumber en la URL');
      }
    });
  }

  private loadOrderDetails(orderNumber: number): void {
    this.orderService.getOrderDetailByOrderNumber(orderNumber).subscribe((res: OrderDetail) => {
      this.blockUI.stop();
      if (res.HasErrors || res.HasWarnings) {
        // Manejar errores aquí
        return;
      }
      this.order = res.Items;
      this.loading = false;
      console.log(this.order);
    }, error => {
      this.blockUI.stop();
      console.error('Error en la solicitud:', error);
    });
  }

  getStatusColor(statusId: number): string {
    return getOrderStatusClassById(statusId);
  }

  getStatusIcon(statusId?: number): string {
    switch (statusId) {
      case OrderStatusEnum.Pending: // Pendiente
        return '⏳';
      case OrderStatusEnum.Preparation: // Procesando
        return '🔄';
      case OrderStatusEnum.Prepared: // Enviado
        return '🚚';
      case OrderStatusEnum.Delivered: // Entregado
        return '✅';
      case OrderStatusEnum.Canceled: // Cancelado
        return '❌';
      default:
        return 'ℹ️';
    }
  }

  getProgressValue(statusId?: number): number {
    switch (statusId) {
      case OrderStatusEnum.Pending: return 25;
      case OrderStatusEnum.Preparation: return 50;
      case OrderStatusEnum.Prepared: return 75;
      case OrderStatusEnum.Delivered: return 100;
      case OrderStatusEnum.Canceled: return 0;
      default: return 0;
    }
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
