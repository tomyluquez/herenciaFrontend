import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { IOrder } from '../../Interface/order.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../../../Other/Services/alert.service';
import { OrderService } from '../../Services/order.service';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { FilteringOptionsOrderListVM } from '../../Models/Filtering-options-order-list.model';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { OrderStatusEnum } from '../../Enums/order-status-enum';
import { EmailJSService } from '../../../Other/Services/emailJS.service';

@Component({
  selector: 'app-form-order-status',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormErrorComponent, BlockUIModule],
  templateUrl: './form-order-status.component.html',
  styleUrl: './form-order-status.component.css'
})
export class FormOrderStatusComponent implements OnInit, OnChanges {
  @BlockUI('order-status-form') blockUI!: NgBlockUI
  @Input({ required: true }) order!: IOrder;
  @Output() newStatus = new EventEmitter<IOrder>();
  loading = true;

  form!: FormGroup
  statesOptions!: NameAndId[]
  constructor(private _orderService: OrderService, private _alertService: AlertService, private _emailJSService: EmailJSService) {
  }

  ngOnInit() {
    this.blockUI.start();
    this._orderService.getFilteringOptionsOrderList(true).subscribe((res: FilteringOptionsOrderListVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }

      this.statesOptions = res.Status
      this.createForm();
      this.blockUI.stop();
      this.loading = false;
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['order'].firstChange) {
      this.order = changes['order'].currentValue;
      this.form.controls['StatusId'].setValue(this.order.OrderStatusId);
    }
  }

  createForm() {
    this.form = new FormGroup({
      StatusId: new FormControl(this.order.OrderStatusId, [Validators.required])
    })
  }

  updateStatus() {
    if (this.form.invalid) return;

    this.blockUI.start();
    const newStatus = this.form.controls['StatusId'].value
    this._orderService.changeStatusOrder(this.order.Id, newStatus).subscribe(async (res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasSuccess) {
        this.order.OrderStatusId = newStatus;
        this.newStatus.emit(this.order);
        if (newStatus === OrderStatusEnum.Prepared) {
          const email = await this._emailJSService.sendEmailDeliveryOrder(this.order.customerName, this.order.CustomerEmail!, this.order.OrderNumber);
          if (!email) {
            this._alertService.openAlert({
              primaryText: 'Error al enviar el correo',
              secondaryText: 'El correo no pudo ser enviado, por favor contactanos a nuestro whatsapp',
              type: 'error'
            })
          }
        }
      }
      this.blockUI.stop();
    })
  }
}
