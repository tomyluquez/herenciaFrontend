import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IProductPagedList, ProductPagedList, SearchProductPagedList } from '../../../interfaces/Products.interfaces';
import { StatusEnum } from '../../../enums/status-enum';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryListVM, ICategoryVM } from '../../../interfaces/Categories.interface';
import { CategoryService } from '../../../services/category.service';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { AlertService } from '../../../services/alert.service';
import { ProductListTable } from '../../../models/Tables/Product-list-table.model';
import { GeneralTableComponent } from '../../../shared/components/tables/general-table/general-table.component';
import { PaginationEnum } from '../../../enums/pagination-enum';
import { NameAndValue } from '../../../interfaces/NameValue.interface';
import { StateOptions } from '../../../models/State-options.model';
import { ProductNavigationService } from '../../../services/Tables/Product-table.service';
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { ModalService } from '../../../services/modal.service';
import { ConfirmModalComponent } from '../../../shared/component/modal/confirm-modal/confirm-modal.component';
import { ChangeStatus } from '../../../interfaces/Others.interface';
import { ResponseMessages } from '../../../interfaces/ResponseMessages.Interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, GeneralTableComponent, BlockUIModule, ConfirmModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  @BlockUI('product-list') blockUI!: NgBlockUI
  categories!: ICategoryVM[]
  statesOptions!: NameAndValue[]
  pagedList!: ProductListTable

  form!: FormGroup

  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  defaultStatus = StatusEnum.Active;

  productId = 0
  titleConfirm = ""

  constructor(private _productsService: ProductService, private _categoryService: CategoryService, private _productNavigationService: ProductNavigationService, private _modalService: ModalService, private _alertService: AlertService) {
    this.form = new FormGroup({
      Name: new FormControl(''),
      Categories: new FormControl([]),
      Sizes: new FormControl(''),
      Order: new FormControl(''),
      Status: new FormControl(this.defaultStatus)
    });

    this.statesOptions = new StateOptions().getStateOptions();

  }

  ngOnInit(): void {
    this.pagedList = new ProductListTable([], 0, this._productNavigationService);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });
      this.pagedList.statusChange.subscribe((productId) => {
        this.productId = productId;
        const product = this.getProductInfo(this.productId)
        this.titleConfirm = `Desea ${product ? product.IsActive ? "Desactivar" : "Activar" : ''} el producto${product ? " " + product.Name : ''}?`
        this._modalService.openConfirm();
      });
    }
    this.init();


  }

  init() {
    this.blockUI.start('Cargando...');
    this._categoryService
      .getAllCategories('active')
      .subscribe((res: CategoryListVM) => {
        if (res.HasErrors || res.HasWarnings) {
          this.blockUI.stop();
          return;
        }

        this.blockUI.stop();
        this.categories = res.Items;
        this.search()
      })
  }

  parameters(): SearchProductPagedList {
    const categories: string = this.form.value.Categories && this.form.value.Categories.length > 0 ? this.form.value.Categories.join(',') : '';
    let parameters: SearchProductPagedList = {
      Name: this.form.value.Name,
      Categories: categories,
      Sizes: this.form.value.Sizes,
      Pagination: { Page: this.page, Limit: this.limit },
      Order: this.form.value.Order,
      Status: this.form.value.Status
    }

    return parameters;
  }

  search() {
    let params = this.parameters();
    this.getPagedList(params)
  }

  getPagedList(params: SearchProductPagedList) {
    this.blockUI.start('Cargando...');
    this._productsService
      .getPagedListProducts(params)
      .subscribe((res: ProductPagedList) => {
        if (res.HasErrors) {
          this.blockUI.stop();
          return;
        }

        this.pagedList.updateData(res.Items, res.TotalItems);

        this.blockUI.stop();
      });
  }

  addProduct() {
    this._productNavigationService.toProductForm(0);
  }

  changeStatus() {
    this.blockUI.start('Cargando...');
    const product = this.getProductInfo(this.productId);
    const status: ChangeStatus = {
      Id: product ? product.Id : 0,
      Status: product ? product.IsActive ? StatusEnum.Inactive : StatusEnum.Active : 0
    }
    this._productsService.changeStatus(status).subscribe((res: ResponseMessages) => {
      this._alertService.showAlerts(res);
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }
      product!.IsActive = !product!.IsActive;
      this.blockUI.stop();
      this._modalService.closeConfirm();
    })
  }

  getProductInfo(productId: number) {
    if (this.pagedList.Items && this.pagedList.Items.length > 0) {
      return this.pagedList.Items.find(i => i.Id === productId);
    }
    return null;
  }
}
