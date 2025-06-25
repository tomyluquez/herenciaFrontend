import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CardSkeletonComponent } from '../../../../shared/components/loaders/card-skeleton/card-skeleton.component';
import { RSidebarComponent } from '../../../../shared/components/rsidebar/rsidebar.component';
import { RSidebarService } from '../../../Other/Services/rsidebar.service';
import { CategoryService } from '../../../Category/Services/category.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { SizesService } from '../../../Size/Services/sizes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import sortingOptions from '../../../../data/sortingOptions.json';
import { NameAndId, NameAndValue } from '../../../Other/Interface/NameValue.interface';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../../shared/components/Cards/card/card.component';
import { CategoryListVM, ICategoryVM, SearchCategoriesPagedList } from '../../../Category/Interfaces/Categories.interface';
import { ProductPagedList, SearchProductPagedList } from '../../Interface/Products.interfaces';
import { ProductNavigationService } from '../../Services/Product-table.service';
import { ActivationStatusEnum } from '../../../Other/Enums/activation-status-enum';
import { PaginationEnum } from '../../../Other/Enums/pagination-enum';
import { FilteringOptionsPagedListProductVM } from '../../Models/Filtering-options-paged-list-product.model';
import { Variant } from '../../../Variant/Models/Variant.model';
import { VariantsService } from '../../../Variant/Services/variants.service';
import { FilteringOptionsProductStockVM } from '../../../Variant/Models/Filtering-options-product-stock.model';
import { ProductToSale } from '../../Models/Products.model';
import { IProductToSale } from '../../Interface/Product.interface';
import { AlertService } from '../../../Other/Services/alert.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CardSkeletonComponent,
    RSidebarComponent,
    CardComponent,
    NgSelectModule,
    FormsModule,
    PaginationComponent,
    CommonModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @BlockUI() blockUI!: NgBlockUI;

  categories!: NameAndId[];
  sizes!: NameAndId[];
  products!: IProductToSale[];
  totalProducts!: number;

  categoriesSeleted: string[] = [];
  sizeSelected: string[] = [];
  sortSelected: string = 'asc';

  params!: SearchProductPagedList;

  loading = true;

  sortingOptions: NameAndValue[] = sortingOptions.Options;

  page = 1;
  limit = 10;

  constructor(
    private _sidebarService: RSidebarService,
    private _productsService: ProductService,
    private _alertService: AlertService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _productNavigation: ProductNavigationService,
    private _variantsService: VariantsService
  ) {
    this._sidebarService.closeSidebar();
  }

  ngOnInit() {
    this.blockUI.start();
    const params: SearchCategoriesPagedList = {
      Name: "",
      Pagination: { Page: PaginationEnum.Page, Limit: 1000 },
      Status: ActivationStatusEnum.Active
    }
    this._variantsService.getFilteringOptionsProductStock().subscribe((res: FilteringOptionsProductStockVM) => {
      if (res.HasErrors || res.HasWarnings) {
        this.blockUI.stop();
        return
      }
      this.blockUI.stop();

      this.categories = res.Categories;
      this.sizes = res.Sizes
      this._route.queryParams.subscribe((queryParams) => {
        this.params = {
          Name: queryParams['name'] || '',
          Categories: queryParams['categories'] || '',
          Sizes: queryParams['sizes'] || '',
          Order: queryParams['order'] || '',
          Pagination: {
            Page: this.page,
            Limit: this.limit,
          },
          Status: ActivationStatusEnum.Active
        };
        this.init();
      });

    })

  }

  ngAfterViewInit() {
    this.resize()
  }

  resize() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  init() {
    if (this.params.Categories && this.params.Categories.length > 0) {
      this.categoriesSeleted = this.params.Categories.split(',');
    }

    if (this.params.Sizes && this.params.Sizes.length > 0) {
      this.sizeSelected = this.params.Sizes.split(',');
    }

    // Realizar la búsqueda usando los parámetros de la URL
    this._productsService
      .getProductsToSale(this.params)
      .subscribe((res: ProductToSale) => {
        this._alertService.showAlerts(res);
        if (res.HasErrors) {
          this.blockUI.stop();
          return;

        }
        this.products = res.Items;
        this.totalProducts = res.TotalItems;
        this.loading = false;
        this.blockUI.stop();
      });
  }

  // Actualizar los parámetros de la URL
  updateUrlParams() {
    const queryParams = {
      categories:
        this.categoriesSeleted.length > 0
          ? this.categoriesSeleted.join(',')
          : null,
      sizes: this.sizeSelected.length > 0 ? this.sizeSelected.join(',') : null,
      order: this.sortSelected,
      page: this.page,
      name: '',
    };

    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: queryParams,
      queryParamsHandling: 'merge', // Mantener otros parámetros de la URL
    });
    this.resize()

  }

  // Al cambiar la categoría, actualizar la URL
  onCategoryChange(id: string) {
    this.page = 1;
    if (!this.categoriesSeleted.includes(id)) {
      this.categoriesSeleted.push(id);
    } else {
      this.categoriesSeleted = this.categoriesSeleted.filter(
        (category) => category !== id
      );
    }
    this.updateUrlParams(); // Actualizar la URL con los nuevos filtros
  }

  // Al cambiar el talle, actualizar la URL
  onSizeChange(id: number) {
    this.page = 1;
    if (!this.sizeSelected.includes(id.toString())) {
      this.sizeSelected.push(id.toString());
    } else {
      this.sizeSelected = this.sizeSelected.filter(
        (size) => size !== id.toString()
      );
    }
    this.updateUrlParams(); // Actualizar la URL con los nuevos filtros
  }

  checkedCategorySelected(selected: string): boolean {
    return this.categoriesSeleted.some((c) => c === selected.toString());
  }

  checkedSizeSelected(selected: number): boolean {
    return this.sizeSelected.some((s) => s === selected.toString());
  }

  openSidebar() {
    this._sidebarService.openSidebar();
  }

  closeSidebar() {
    this._sidebarService.closeSidebar();
  }

  sort(value: string) {
    this.sortSelected = value;
    this.updateUrlParams();
  }

  nextPage() {
    this.page++;
    this.updateUrlParams();
  }

  prevPage() {
    this.page--;
    this.updateUrlParams();
  }

  resetCategories() {
    this.categoriesSeleted = [];
    this.updateUrlParams();
  }

  resetSizes() {
    this.sizeSelected = [];
    this.updateUrlParams();
  }

  resetAllFilters() {
    this.categoriesSeleted = [];
    this.sizeSelected = [];
    this.updateUrlParams();
  }
  removeCategory(category: string, event: Event) {
    event.stopPropagation();
    this.categoriesSeleted = this.categoriesSeleted.filter(
      (c) => c !== category
    );
    this.updateUrlParams();
  }

  removeSize(size: number, event: Event) {
    event.stopPropagation();
    this.sizeSelected = this.sizeSelected.filter((s) => s !== size.toString());
    this.updateUrlParams();
  }

  seeProduct(productId: number) {
    this._productNavigation.toProductDetails(productId);
  }
}
