import { Component } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { OrderListTable } from '../../Models/Order-list-table.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { OrderStatusEnum } from '../../Enums/order-status-enum';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { GeneralTableComponent } from '../../../Table/Pages/general-table/general-table.component';
import { RSidebarComponent } from '../../../../shared/components/rsidebar/rsidebar.component';
import { SearchOrderPagedList } from '../../Interface/order-list.interface';
import { OrderService } from '../../Services/order.service';
import { FilteringOptionsOrderListVM } from '../../Models/Filtering-options-order-list.model';
import { OrderVM } from '../../Models/Order.model';
import { IOrder } from '../../Interface/order.interface';
import { RSidebarService } from '../../../Other/Services/rsidebar.service';
import { FormOrderStatusComponent } from "../form-order-status/form-order-status.component";
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { formatDate } from '../../../Form/Helpers/form.helpers';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, NgSelectModule, BlockUIModule, ReactiveFormsModule, GeneralTableComponent, RSidebarComponent, FormOrderStatusComponent, OrderDetailComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  @BlockUI('order-list') blockUI!: NgBlockUI
  pagedList!: OrderListTable

  form!: FormGroup

  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  defaultStatus = OrderStatusEnum.All;

  statesOptions!: NameAndId[]

  orderSelected!: IOrder | null
  orderDetailId!: number;

  constructor(private _orderService: OrderService, private _rSidebarService: RSidebarService) {
    const today = new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Primer día del mes
    const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1); // Primer día del mes

    this.form = new FormGroup({
      CustomerName: new FormControl(''),
      OrderNumber: new FormControl(null),
      OrderStatus: new FormControl(this.defaultStatus),
      StartDate: new FormControl(formatDate(firstDayOfMonth)), // ✅ Formato correcto
      EndDate: new FormControl(formatDate(tomorrow)), // ✅ Formato correcto
    });
  }


  ngOnInit(): void {
    this.pagedList = new OrderListTable([], 0);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });

      this.pagedList.statusChange.subscribe((orderId) => {
        this.orderDetailId = 0
        this.orderSelected = this.pagedList.Items.find(i => i.Id === orderId)!;
        this._rSidebarService.openSidebar();
      });

      this.pagedList.orderDetails.subscribe((orderId) => {
        this.orderSelected = null;
        this.orderDetailId = orderId;
        this._rSidebarService.openSidebar();
      });
    }
    this.init();

  }

  init() {
    this.blockUI.start();
    this._orderService.getFilteringOptionsOrderList(false).subscribe((res: FilteringOptionsOrderListVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }

      this.statesOptions = res.Status
      this.blockUI.stop();
      this.search();
    })

  }

  parameters(): SearchOrderPagedList {
    let parameters: SearchOrderPagedList = {
      CustomerName: this.form.controls['CustomerName'].value,
      OrderNumber: this.form.controls['OrderNumber'].value,
      Pagination: { Page: this.page, Limit: this.limit },
      OrderStatus: this.form.controls['OrderStatus'].value,
      StartDate: this.form.controls['StartDate'].value,
      EndDate: this.form.controls['EndDate'].value,
    }

    return parameters;
  }

  search() {
    let params = this.parameters();
    this.getPagedList(params)
  }

  getPagedList(params: SearchOrderPagedList) {
    this.blockUI.start();
    this._orderService
      .getOrders(params)
      .subscribe((res: OrderVM) => {
        if (res.HasErrors) {
          this.blockUI.stop();
          return;
        }

        this.pagedList.updateData(res.Items, res.TotalItems);

        this.blockUI.stop();
      });
  }

  updateStatus(order: IOrder) {
    this.orderSelected = null;
    const indexOrder = this.pagedList.Items.findIndex(i => i.Id === order.Id)!
    this.pagedList.Items[indexOrder] = order

    this._rSidebarService.closeSidebar();
  }
}
