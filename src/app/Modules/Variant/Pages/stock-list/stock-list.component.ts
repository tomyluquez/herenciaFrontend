import { Component, OnInit } from '@angular/core';
import { BlockUI, BlockUIModule, NgBlockUI } from 'ng-block-ui';
import { ProductsStockListTable } from '../../Models/Stock-list-table.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { SizesService } from '../../../Size/Services/sizes.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NameAndId } from '../../../Other/Interface/NameValue.interface';
import { GeneralTableComponent } from '../../../Table/Pages/general-table/general-table.component';
import { RSidebarService } from '../../../Other/Services/rsidebar.service';
import { RSidebarComponent } from '../../../../shared/components/rsidebar/rsidebar.component';
import { StockFormComponent } from "../stock-form/stock-form.component";
import { CategoryService } from '../../../Category/Services/category.service';
import { ActivationStatusEnum } from '../../../Other/Enums/activation-status-enum';
import { IProductsStock, ProductStockVM, SearchProductsStockPagedList } from '../../Interface/Variant.interface';
import { VariantsService } from '../../Services/variants.service';
import { FilteringOptionsProductStockVM } from '../../Models/Filtering-options-product-stock.model';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule, FormsModule, GeneralTableComponent, BlockUIModule, RSidebarComponent, StockFormComponent],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.css'
})
export class StockListComponent implements OnInit {
  @BlockUI('stock-list') blockUI!: NgBlockUI
  pagedList!: ProductsStockListTable

  form!: FormGroup

  page = PaginationEnum.Page;
  limit = PaginationEnum.Limit;

  defaultStatus = ActivationStatusEnum.Active;

  categories!: NameAndId[]
  sizes!: NameAndId[]
  statesOptions!: NameAndId[]

  variantSelected!: IProductsStock;

  constructor(private _variantsService: VariantsService, private _rSidebarSerive: RSidebarService, private _sizeService: SizesService, private _categoryService: CategoryService) {
    this.form = new FormGroup({
      ProductName: new FormControl(''),
      SizeId: new FormControl(null),
      CategoryId: new FormControl(null),
      Status: new FormControl(this.defaultStatus)
    });

  }

  ngOnInit(): void {
    this.pagedList = new ProductsStockListTable([], 0);
    if (this.pagedList) {
      this.pagedList.pageChange.subscribe((newPage) => {
        this.page = newPage;
        this.search();
      });

      this.pagedList.statusChange.subscribe((variantId) => {
        this.variantSelected = this.pagedList.Items.find(i => i.Id === variantId)!;
        this._rSidebarSerive.openSidebar();
      });
    }
    this.init();

  }

  init() {
    this.blockUI.start();
    this._variantsService.getFilteringOptionsProductStock().subscribe((res: FilteringOptionsProductStockVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }

      this.categories = res.Categories;
      this.sizes = res.Sizes
      this.statesOptions = res.Status
      this.blockUI.stop();
      this.search();
    })

  }

  parameters(): SearchProductsStockPagedList {
    let parameters: SearchProductsStockPagedList = {
      ProductName: this.form.controls['ProductName'].value,
      SizeId: this.form.controls['SizeId'].value,
      Pagination: { Page: this.page, Limit: this.limit },
      Status: this.form.controls['Status'].value,
      CategoryId: this.form.controls['CategoryId'].value
    }

    return parameters;
  }

  search() {
    let params = this.parameters();
    this.getPagedList(params)
  }

  getPagedList(params: SearchProductsStockPagedList) {
    this.blockUI.start();
    this._variantsService
      .getProductsStock(params)
      .subscribe((res: ProductStockVM) => {
        console.log(res)
        if (res.HasErrors) {
          this.blockUI.stop();
          return;
        }

        this.pagedList.updateData(res.Items, res.TotalItems);

        this.blockUI.stop();
      });
  }

  updateStock() {
    this.search();
    this._rSidebarSerive.closeSidebar();
  }

}
