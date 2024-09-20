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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DividerComponent, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  items: IMenuVM[] = iconsHero.Items;
  categories!: ICategoryVM[];
  promotionalProducts!: IPromotionalProduct[];

  loadingCategories = true;
  loadingProducts = true;

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadingCategories = true;
    this.loadingProducts = true;
    this.blockUI.start('Cargando...');
    this._categoryService
      .getAllCategories()
      .subscribe((res: CategoryListVM) => {
        if (res.HasErrors || res.HasWarnings) {
          return;
        }

        this.categories = res.Items;
        this.loadingCategories = false;
      });

    this._productService
      .getPromotionalProducts()
      .subscribe((res: PromotionalProductsVM) => {
        if (res.HasErrors || res.HasWarnings) {
          return;
        }

        this.promotionalProducts = res.Items;
        this.loadingProducts = false;
      });
    this.blockUI.stop();
  }
}
