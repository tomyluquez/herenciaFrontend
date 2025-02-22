import { Component, OnInit } from '@angular/core';
import iconsHero from '../../data/iconsHero.json';
import { IMenuVM } from '../../interfaces/Menu.Interfaces';
import { CommonModule } from '@angular/common';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import {
  CategoryListVM,
  ICategoryVM,
} from '../../interfaces/Categories.interface';
import { CategoryService } from '../../services/category.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { ProductService } from '../../services/product.service';
import {
  IPromotionalProduct,
  PromotionalProductsVM,
} from '../../interfaces/Products.interfaces';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CardSkeletonComponent } from '../../shared/components/loaders/card-skeleton/card-skeleton.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerCardsHomeComponent } from '../../shared/components/container-cards-home/container-cards-home.component';
import { containerCardHomeMapper } from '../../services/Helpers/Maps/container-card-home.mapper';
import { ItemDataContainerCards } from '../../interfaces/Others.interface';
import { DataContainerCards } from '../../models/Order.model';
import { GetQuantityPages } from '../../services/Helpers/getQuantityPages.service';
import { PaginationEnum } from '../../enums/pagination-enum';

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
    this.blockUI.start('Cargando...');
    this._categoryService
      .getAllCategories('active', PaginationEnum.Page)
      .subscribe((res: CategoryListVM) => {
        this.setCategories(res);
      });

    this._productService
      .getPromotionalProducts(PaginationEnum.Page)
      .subscribe((res: PromotionalProductsVM) => {
        this.setPromotionalProducts(res);
      });
    this.blockUI.stop();
  }

  searchByCategory(categoryId: number) {
    const categoryName = this.categories.Items.find((c) => c.Id == categoryId)?.Name;
    this._router.navigateByUrl(`Products?categories=${categoryName}`);
  }

  seeProduct(productId: number) {
    this._router.navigateByUrl(`Product/${productId}`);
  }

  changeLimitCategories(newLimit: number) {
    this.loadingCategories = true;
    this._categoryService
      .getAllCategories('active', newLimit)
      .subscribe((res: CategoryListVM) => {
        this.setCategories(res);
        this.loadingCategories = false;
      });
  }

  changeLimitProducts(newLimit: number) {
    this.loadingProducts = true;
    this._productService
      .getPromotionalProducts(newLimit)
      .subscribe((res: PromotionalProductsVM) => {
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

  setPromotionalProducts(res: PromotionalProductsVM) {
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
