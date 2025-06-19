import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { VariantsService } from '../../Services/variants.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { IProductsStock } from '../../Interface/Variant.interface';
import { AlertService } from '../../../Other/Services/alert.service';

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [CommonModule, FormErrorComponent, BlockUIModule, ReactiveFormsModule],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.css'
})
export class StockFormComponent implements OnInit, OnChanges {
  @BlockUI('stock-form') blockUI!: NgBlockUI
  @Input({ required: true }) variant!: IProductsStock;
  @Output() newVariant = new EventEmitter();

  form!: FormGroup
  loading = true;

  constructor(private _variantService: VariantsService, private _alertService: AlertService) {
  }

  ngOnInit() {
    this.blockUI.start();
    this.createForm();
    this.blockUI.stop();
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['variant'].firstChange) {
      this.variant = changes['variant'].currentValue;
      this.form.controls['Quantity'].setValue(this.variant.Stock);
    }
  }

  createForm() {
    console.log(this.variant)
    this.form = new FormGroup({
      Quantity: new FormControl(this.variant.Stock, [Validators.required, Validators.pattern("^[0-9]*$")])
    })
  }

  uploadStock() {
    if (this.form.invalid) return;

    this.blockUI.start();
    const newQuantity = this.form.controls['Quantity'].value
    this._variantService.updateStock(this.variant.Id, newQuantity).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasSuccess) {
        this.variant.Stock = newQuantity;
        this.newVariant.emit();
      }
      this.blockUI.stop();
    })
  }

}
