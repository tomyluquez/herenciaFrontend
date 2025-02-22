import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProductVariants } from '../../../interfaces/Products.interfaces';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from '../counter/counter.component';
import { VariantSelected } from '../../../interfaces/Variant.interface';

@Component({
  selector: 'app-size-selector',
  standalone: true,
  imports: [CommonModule, FormsModule, CounterComponent],
  templateUrl: './size-selector.component.html',
  styleUrl: './size-selector.component.css',
})
export class SizeSelectorComponent {
  @Input() sizes!: IProductVariants[];
  @Output() variantEmit: EventEmitter<VariantSelected> = new EventEmitter();
  sizeSelected!: IProductVariants;
  quantitySelected = 1;

  constructor() {}

  ngOnInit() {}

  selectSize(size: IProductVariants) {
    this.sizeSelected = size;
    this.variantEmit.emit({
      VariantId: this.sizeSelected.Id!,
      Quantity: this.quantitySelected,
    });
  }

  setVariant(quantity: any) {
    this.quantitySelected = quantity;
    this.variantEmit.emit({
      VariantId: this.sizeSelected.Id!,
      Quantity: this.quantitySelected,
    });
  }
}
