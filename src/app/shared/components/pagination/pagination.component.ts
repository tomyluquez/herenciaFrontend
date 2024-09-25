import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() totalItems!: number;
  @Input() page!: number;
  @Input() limit!: number;

  @Output() onPageChangePrev = new EventEmitter<number>();
  @Output() onPageChangeNext = new EventEmitter<number>();

  totalPages!: number;

  constructor() {}

  ngOnChanges() {
    if (this.totalItems && this.limit) {
      this.totalPages = Math.ceil(this.totalItems / this.limit);
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.onPageChangePrev.emit(this.page - 1);
    }
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.onPageChangeNext.emit(this.page + 1);
    }
  }
}
