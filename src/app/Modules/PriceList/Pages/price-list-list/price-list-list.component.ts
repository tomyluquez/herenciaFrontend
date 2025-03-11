import { Component } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { PriceListListTable } from '../../Models/Price-list-list-table.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { IPriceListProducts, PriceListProductsSearch } from '../../Interface/Price-list.interface';
import { RSidebarService } from '../../../Other/Services/rsidebar.service';
import { ModalService } from '../../../Other/Services/modal.service';
import { AlertService } from '../../../Other/Services/alert.service';
import { PriceListService } from '../../Services/price-list.service';
import { PriceListProductsVM } from '../../Models/Price-list-list.model';
import { FilteringOptionsPriceListVM } from '../../Models/Filtering-options-price-list.model';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { RSidebarComponent } from '../../../../shared/components/rsidebar/rsidebar.component';
import { GeneralTableComponent } from '../../../Table/Pages/general-table/general-table.component';
import { PriceListFormComponent } from '../price-list-form/price-list-form.component';
import { PriceListFormUpdateComponent } from '../price-list-form-update/price-list-form-update.component';

@Component({
  selector: 'app-price-list-list',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    BlockUIModule,
    RSidebarComponent,
    GeneralTableComponent,
    PriceListFormComponent,
    PriceListFormUpdateComponent
  ],
  templateUrl: './price-list-list.component.html',
  styleUrl: './price-list-list.component.css'
})
export class PriceListListComponent {
  @BlockUI('priceList-list') blockUI!: NgBlockUI;
  pagedList!: PriceListListTable

  form!: FormGroup

  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  categories!: NameAndId[]

  priceSelected!: number;
  isEditProduct = false;
  isEditPriceList = false;
  productSelected!: IPriceListProducts | null


  constructor(private _priceListService: PriceListService, public _rSidebarSerive: RSidebarService) {
    this.form = new FormGroup({
      Name: new FormControl(''),
      Category: new FormControl(null),
    });

  }

  ngOnInit(): void {
    this.pagedList = new PriceListListTable([], 0);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });

      this.pagedList.edit.subscribe((productId) => {
        this.isEditPriceList = false;
        this.isEditProduct = true;
        this.productSelected = this.pagedList.Items.find(i => i.Id === productId)!;
        this._rSidebarSerive.openSidebar();
      });
    }
    this.init();

  }

  init() {
    this.blockUI.start('Cargando...');
    this._priceListService.getFilteringOptionsPriceList().subscribe((res: FilteringOptionsPriceListVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }

      this.categories = res.Categories;
      this.blockUI.stop();
      this.search();
    })

  }

  parameters(): PriceListProductsSearch {
    let parameters: PriceListProductsSearch = {
      ProductName: this.form.controls['Name'].value,
      Pagination: { Page: this.page, Limit: this.limit },
      CategoryId: this.form.controls['Category'].value,
    }

    return parameters;
  }

  search() {
    this._rSidebarSerive.closeSidebar();
    let params = this.parameters();
    this.getPagedList(params)
  }

  getPagedList(params: PriceListProductsSearch) {
    this.blockUI.start('Cargando...');
    this._priceListService
      .getPriceListProducts(params)
      .subscribe((res: PriceListProductsVM) => {
        if (res.HasErrors) {
          this.blockUI.stop();
          return;
        }

        this.pagedList.updateData(res.Items, res.TotalItems);

        this.blockUI.stop();
      });
  }

  updateProduct(product: IPriceListProducts) {
    const productIndex = this.pagedList.Items.findIndex(i => i.Id === product.Id);
    this.pagedList.Items[productIndex] = product;
    this._rSidebarSerive.closeSidebar();
  }

  updatePriceList() {
    this.isEditProduct = false;
    this.isEditPriceList = true;
    this.productSelected = null;
    this._rSidebarSerive.openSidebar();
  }


}
