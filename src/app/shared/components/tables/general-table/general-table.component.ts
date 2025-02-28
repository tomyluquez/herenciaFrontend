import { Component, Input } from '@angular/core';
import { Table } from '../../../../models/Tables/Table.model';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../pagination/pagination.component';
import { GenericItemTable } from '../../../../interfaces/Tables/Table-actions.interface';

@Component({
  selector: 'app-general-table',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './general-table.component.html',
  styleUrl: './general-table.component.css'
})
export class GeneralTableComponent<T extends GenericItemTable> {
  @Input({ required: true }) data!: Table<T>;

  constructor() { }

  nextPage() {
    this.data.nextPage();
  }

  prevPage() {
    this.data.prevPage()
  }
}
