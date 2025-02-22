import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardSkeletonComponent } from '../loaders/card-skeleton/card-skeleton.component';
import { CardComponent } from '../card/card.component';
import { DataContainerCards } from '../../../models/Order.model';
import { PaginationEnum } from '../../../enums/pagination-enum';

@Component({
  selector: 'app-container-cards-home',
  standalone: true,
  imports: [CardSkeletonComponent, CardComponent],
  templateUrl: './container-cards-home.component.html',
  styleUrl: './container-cards-home.component.css'
})
export class ContainerCardsHomeComponent {
  @Input({ required: true }) data!: DataContainerCards
  @Input({ required: true }) isLoading!: boolean
  @Output() clickCard = new EventEmitter<number>
  @Output() changeLimit = new EventEmitter<number>

  currentPage = PaginationEnum.Page;

  constructor() { }

  search(id: number) {
    this.clickCard.emit(id)
  }

  showMore() {
    this.currentPage++;
    this.changeLimit.emit(this.currentPage)
  }

  showLess() {
    this.currentPage = 1;
    this.changeLimit.emit(this.currentPage)
  }

}
