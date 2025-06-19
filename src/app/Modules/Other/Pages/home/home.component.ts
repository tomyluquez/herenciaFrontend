import { Component, OnInit } from '@angular/core';
import iconsHero from '../../../../data/iconsHero.json';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../../../../shared/components/divider/divider.component';
import { CategoryService } from '../../../Category/Services/category.service';
import { ProductService } from '../../../Product/Services/product.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';
import { ContainerCardsHomeComponent } from '../../../../shared/components/Cards/container-cards-home/container-cards-home.component';
import { containerCardHomeMapper } from '../../Helpers/container-card-home.mapper';
import { GetQuantityPages } from '../../Helpers/getQuantityPages.service';
import { PaginationEnum } from '../../Enums/pagination-enum';
import { IMenuVM } from '../../../Menu/Interface/Menu.Interfaces';
import { DataContainerCards } from '../../../Order/Models/Order.model';
import { ActivationStatusEnum } from '../../Enums/activation-status-enum';
import { CategoryListVM, SearchCategoriesPagedList } from '../../../Category/Interfaces/Categories.interface';
import { PromotionalProducts } from '../../../Product/Interface/Products.interfaces';
import { HomeInfoResponse } from '../../Models/Home-info.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DividerComponent,
    ContainerCardsHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  items: IMenuVM[] = iconsHero.Items;
  categories!: DataContainerCards;
  promotionalProducts!: DataContainerCards;

  loadingCategories = true;
  loadingProducts = true;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loadingCategories = true;
    this.loadingProducts = true;
    this.blockUI.start();
    const params: SearchCategoriesPagedList = {
      Name: "",
      Pagination: { Page: PaginationEnum.Page, Limit: 5 },
      Status: ActivationStatusEnum.Active
    }
    this._productService.getHomeInfo(params).subscribe((res: HomeInfoResponse) => {
      this.blockUI.stop();
      this.loadingCategories = false;
      this.loadingProducts = false;
      if (res.HasErrors || res.HasWarnings) {
        return;
      }
      this.setCategories(res.Categories);
      this.setPromotionalProducts(res.PromotionalProducts);
    })
  }

  searchByCategory(categoryId: number) {
    const categoryName = this.categories.Items.find((c) => c.Id == categoryId)?.Name;
    this._router.navigateByUrl(`Products?categories=${categoryName}`);
  }

  seeProduct(productId: number) {
    this._router.navigateByUrl(`Products/product/${productId}`);
  }

  changeLimitCategories(newLimit: number) {
    this.loadingCategories = true;
    const params: SearchCategoriesPagedList = {
      Name: "",
      Pagination: { Page: PaginationEnum.Page, Limit: newLimit },
      Status: ActivationStatusEnum.Active
    }
    this._categoryService
      .getAllCategories(params)
      .subscribe((res: CategoryListVM) => {
        this.setCategories(res);
        this.loadingCategories = false;
      });
  }

  changeLimitProducts(newLimit: number) {
    this.loadingProducts = true;
    this._productService
      .getPromotionalProducts(newLimit)
      .subscribe((res: PromotionalProducts) => {
        this.setPromotionalProducts(res);
        this.loadingProducts = false;
      });
  }

  setCategories(res: CategoryListVM) {
    if (res.HasErrors || res.HasWarnings) {
      return;
    }

    const quantityPages = GetQuantityPages(res.TotalItems, PaginationEnum.Limit)
    const items = containerCardHomeMapper(res.Items);
    this.categories = new DataContainerCards();
    this.categories.Title = 'Nuestras categorias';
    this.categories.Items = items;
    this.categories.QuantityPages = quantityPages;
    this.loadingCategories = false;
  }

  setPromotionalProducts(res: PromotionalProducts) {
    if (res.HasErrors || res.HasWarnings) {
      return;
    }

    const quantityPages = GetQuantityPages(res.TotalItems, PaginationEnum.Limit)
    const items = containerCardHomeMapper(res.Items);
    this.promotionalProducts = new DataContainerCards();
    this.promotionalProducts.Title = 'Productos promocionales';
    this.promotionalProducts.Items = items;
    this.promotionalProducts.QuantityPages = quantityPages;

    this.loadingProducts = false;
  }

  goToProducts() {
    this._router.navigate(['/Products']);
  }
}
