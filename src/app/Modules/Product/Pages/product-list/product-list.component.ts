import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoryService } from '../../../Category/Services/category.service';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { ProductListTable } from '../../Models/Product-list-table.model';
import { GeneralTableComponent } from '../../../Table/Pages/general-table/general-table.component';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { ModalService } from '../../../Other/Services/modal.service';
import { ChangeStatus } from '../../../Other/Interface/Others.interface';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { ConfirmModalComponent } from '../../../../shared/components/modal/confirm-modal/confirm-modal.component';
import { ActivationStatusEnum } from '../../../Other/Enums/activation-status-enum';
import { ProductNavigationService } from '../../Services/Product-table.service';
import { AlertService } from '../../../Other/Services/alert.service';
import { FilteringOptionsPagedListProductVM } from '../../Models/Filtering-options-paged-list-product.model';
import { ProductPagedList, SearchProductPagedList } from '../../Interface/Products.interfaces';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, GeneralTableComponent, BlockUIModule, ConfirmModalComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  @BlockUI('product-list') blockUI!: NgBlockUI
  categories!: NameAndId[]
  statesOptions!: NameAndId[]
  pagedList!: ProductListTable

  form!: FormGroup

  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  defaultStatus = ActivationStatusEnum.Active;

  productId = 0
  titleConfirm = ""

  constructor(private _productsService: ProductService, private _productNavigationService: ProductNavigationService, private _modalService: ModalService, private _alertService: AlertService) {
    this.form = new FormGroup({
      Name: new FormControl(''),
      Categories: new FormControl([]),
      Sizes: new FormControl(''),
      Order: new FormControl(''),
      Status: new FormControl(this.defaultStatus)
    });

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
    this._productsService.getFilteringOptionsPagedListProduct().subscribe((res: FilteringOptionsPagedListProductVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return;
      }
      this.categories = res.Categories;
      this.statesOptions = res.Status;
      this.blockUI.stop();
      this.search();
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
      Status: product ? product.IsActive ? ActivationStatusEnum.Inactive : ActivationStatusEnum.Active : 0
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
