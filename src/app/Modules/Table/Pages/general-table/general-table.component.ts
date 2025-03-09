import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { GenericItemTable } from '../../Interface/Table-actions.interface';
import { HeaderTypeEnum } from '../../../Form/Enums/headers-form-type-enum';
import { Table } from '../../Models/Table.model';
import { OrderStatusEnum } from '../../../Order/Enums/order-status-enum';
import { getOrderStatusClassById, getOrderStatusNameById } from '../../../Order/Helpers/order-status.helper';

@Component({
  selector: 'app-general-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './general-table.component.html',
  styleUrl: './general-table.component.css'
})
export class GeneralTableComponent<T extends GenericItemTable> {
  @Input({ required: true }) data!: Table<T>;
  headerTypeEnum = HeaderTypeEnum
  orderStatusEnum = OrderStatusEnum

  constructor() { }

  nextPage() {
    this.data.nextPage();
  }

  prevPage() {
    this.data.prevPage()
  }

  getTotal(header: string) {
    const total = this.data.Items.reduce((total, item) => total + item[header], 0);
    return this.data.Headers.find(h => h.Name === header)?.Type === HeaderTypeEnum.Price ? `$${total}` : total;
  }

  getClass(itemId: number): string {
    return getOrderStatusClassById(itemId);
  }

  getName(itemId: number): string {
    return getOrderStatusNameById(itemId);
  }

}
