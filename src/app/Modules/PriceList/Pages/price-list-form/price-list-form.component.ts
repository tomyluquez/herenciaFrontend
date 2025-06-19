import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { IPriceListProducts, UpdatePriceProduct } from '../../Interface/Price-list.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PriceListService } from '../../Services/price-list.service';
import { AlertService } from '../../../Other/Services/alert.service';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-price-list-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BlockUIModule, FormErrorComponent,],
  templateUrl: './price-list-form.component.html',
  styleUrl: './price-list-form.component.css'
})
export class PriceListFormComponent implements OnInit, OnChanges {
  @BlockUI('priceList-form') blockUI!: NgBlockUI
  @Input({ required: true }) product!: IPriceListProducts;
  @Output() newproduct = new EventEmitter<IPriceListProducts>();

  form!: FormGroup
  loading = true;

  constructor(private _priceListService: PriceListService, private _alertService: AlertService) {
  }

  ngOnInit() {
    this.blockUI.start();
    this.createForm();
    this.blockUI.stop();
    this.loading = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['product'])
    if (!changes['product'].firstChange) {
      this.product = changes['product'].currentValue;
      this.createForm();
    }
  }

  createForm() {
    this.form = new FormGroup({
      Discount: new FormControl(this.product.Discount || 0),
      Price: new FormControl(this.product.Price),
      PromotionalPrice: new FormControl(this.product.PromotionalPrice || 0, [Validators.required]),
      IsPromotional: new FormControl(this.product.Discount > 0)
    })
  }

  uploadproduct() {
    if (this.form.invalid) return;

    this.blockUI.start();
    const newproduct = this.getproduct();
    this._priceListService.updatePriceProduct(newproduct).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasSuccess) {
        this.product = {
          ...this.product,
          Price: newproduct.Price,
          PromotionalPrice: newproduct.PromotionalPrice,
          Discount: newproduct.Discount
        };
      }
      this.newproduct.emit(this.product);
      this.blockUI.stop();
    })
  }

  getproduct(): UpdatePriceProduct {
    const isPromotional = this.form.controls['IsPromotional'].value;
    const newproduct: UpdatePriceProduct = {
      ProductId: this.product.Id,
      Price: this.form.controls['Price'].value,
      Discount: isPromotional ? this.form.controls['Discount'].value : 0,
      PromotionalPrice: isPromotional ? this.form.controls['PromotionalPrice'].value : 0
    }
    return newproduct;
  }

  calculatePromotionalPrice() {
    if (this.form.controls['IsPromotional'].value) {
      this.form.controls['PromotionalPrice'].setValue(this.form.controls['Price'].value * (1 - this.form.controls['Discount'].value / 100));
    }
  }

}
