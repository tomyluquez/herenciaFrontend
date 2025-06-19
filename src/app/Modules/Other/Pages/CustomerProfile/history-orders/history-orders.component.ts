import { Component, Input, OnInit } from '@angular/core';
import { IOrderUser } from '../../../../User/Interface/User-pofile.interface';
import { PaginationEnum } from '../../../Enums/pagination-enum';
import { UserListTable } from '../../../../User/Models/UserListTable';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { OrderService } from '../../../../Order/Services/order.service';
import { SearchOrderPagedList } from '../../../../Order/Interface/order-list.interface';
import { OrderVM } from '../../../../Order/Models/Order.model';
import { CommonModule } from '@angular/common';
import { GeneralTableComponent } from '../../../../Table/Pages/general-table/general-table.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderStatusEnum } from '../../../../Order/Enums/order-status-enum';
import { FilteringOptionsOrderListVM } from '../../../../Order/Models/Filtering-options-order-list.model';
import { NameAndId } from '../../../Interface/NameValue.interface';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-history-orders',
  standalone: true,
  imports: [CommonModule, BlockUIModule, GeneralTableComponent, ReactiveFormsModule, NgSelectModule],
  templateUrl: './history-orders.component.html',
  styleUrl: './history-orders.component.css'
})
export class HistoryOrdersComponent implements OnInit {
  @BlockUI('history-order-list') blockUI!: NgBlockUI

  @Input() customerName!: string
  pagedList!: UserListTable

  form!: FormGroup

  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  orderDetailId!: number;
  statesOptions!: NameAndId[]

  defaultStatus = OrderStatusEnum.All;


  constructor(private orderService: OrderService, private router: Router) {
    this.form = new FormGroup({
      OrderStatus: new FormControl(this.defaultStatus),
    });
  }

  ngOnInit(): void {
    this.pagedList = new UserListTable([], 0);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });

      this.pagedList.orderDetails.subscribe((orderId) => {
        const orderNumber = this.pagedList.Items.find(i => i.Id === orderId)!.OrderNumber
        this.router.navigate(['Order/order-status', orderNumber]);
      });
    }
    this.init();

  }

  init() {
    this.blockUI.start();
    this.orderService.getFilteringOptionsOrderList(false).subscribe((res: FilteringOptionsOrderListVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }

      this.statesOptions = res.Status
      this.blockUI.stop();
      this.search();
    })

  }

  search() {
    let params = this.parameters();
    this.getPagedList(params)
  }

  parameters(): SearchOrderPagedList {
    let parameters: SearchOrderPagedList = {
      CustomerName: this.customerName,
      OrderNumber: 0,
      Pagination: { Page: this.page, Limit: this.limit },
      OrderStatus: this.form.controls['OrderStatus'].value,
      StartDate: undefined,
      EndDate: undefined,
    }

    return parameters;
  }

  getPagedList(params: SearchOrderPagedList) {
    this.blockUI.start();
    this.orderService
      .getOrders(params)
      .subscribe((res: OrderVM) => {
        if (res.HasErrors) {
          console.log('hola')
          this.blockUI.stop();
          return;
        }

        const items: IOrderUser[] = res.Items.map((item) => ({
          Id: item.Id,
          OrderNumber: item.OrderNumber,
          DateCreated: item.DateCreated,
          OrderStatusId: item.OrderStatusId,
        }));
        this.pagedList.updateData(items, res.TotalItems);

        this.blockUI.stop();
      });
  }
}
