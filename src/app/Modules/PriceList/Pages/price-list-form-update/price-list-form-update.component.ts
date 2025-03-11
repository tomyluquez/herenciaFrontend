import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { ActionsUpdtePriceListEnum } from '../../Enums/Actions-update-price-list.enum';
import { FormErrorComponent } from '../../../Form/Pages/form-error/form-error.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { CategoryService } from '../../../Category/Services/category.service';
import { ActivationStatusEnum } from '../../../Other/Enums/activation-status-enum';
import { CategoryListVM } from '../../../Category/Models/CategoryList.model';
import { UpdateAllPriceProduct } from '../../Interface/Price-list.interface';
import { PriceListService } from '../../Services/price-list.service';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { AlertService } from '../../../Other/Services/alert.service';

@Component({
  selector: 'app-price-list-form-update',
  standalone: true,
  imports: [ReactiveFormsModule, BlockUIModule, FormErrorComponent, NgSelectModule, CommonModule],
  templateUrl: './price-list-form-update.component.html',
  styleUrl: './price-list-form-update.component.css'
})
export class PriceListFormUpdateComponent implements OnInit {
  @BlockUI('priceList-form-update') blockUI!: NgBlockUI;
  @Output() updatePriceListProduts = new EventEmitter();
  ActionsUpdtePriceListEnum = ActionsUpdtePriceListEnum
  form!: FormGroup

  categories!: NameAndId[]

  loading = true;

  constructor(private _categoriesService: CategoryService, private _priceListService: PriceListService, private _alertService: AlertService) { }

  ngOnInit() {
    this.blockUI.start('Cargando...');
    const params = {
      Name: "",
      Pagination: { Page: 1, Limit: 10000 },
      Status: ActivationStatusEnum.Active
    }
    this._categoriesService.getAllCategories(params).subscribe((res: CategoryListVM) => {
      if (res.HasErrors) {
        this.blockUI.stop();
        return;
      }

      this.categories = res.Items.map(c => ({ Name: c.Name, Id: c.Id }));
      this.createForm();
      this.loading = false;
      this.blockUI.stop();
    })
  }

  createForm() {
    this.form = new FormGroup({
      Action: new FormControl(ActionsUpdtePriceListEnum.ChangePrice),
      ActionType: new FormControl(ActionsUpdtePriceListEnum.General),
      Category: new FormControl(null),
      Percentage: new FormControl(0),
      Discount: new FormControl(0),
    })
  }

  updatePriceList() {
    this.blockUI.start('Cargando...');
    if (!this.form.controls['Percentage'].value && !this.form.controls['Discount'].value) return;

    const params = this.parametrs();

    this._priceListService.updateAllProductsPrice(params).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasErrors) {
        this.blockUI.stop();
        return;
      }

      this.blockUI.stop();
      this.form.reset({
        Action: ActionsUpdtePriceListEnum.ChangePrice,
        ActionType: ActionsUpdtePriceListEnum.General,
        Category: null,
        Percentage: 0,
        Discount: 0,
      });
      this.updatePriceListProduts.emit();
    })

  }

  parametrs(): UpdateAllPriceProduct {
    return {
      ActionType: this.form.controls['Action'].value,
      Percentage: this.form.controls['Percentage'].value,
      Discount: this.form.controls['Discount'].value,
      CategoryId: this.form.controls['Category'].value
    }
  }
}
