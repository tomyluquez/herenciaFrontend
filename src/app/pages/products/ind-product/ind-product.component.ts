import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { IProductVM, ProductVM } from '../../../interfaces/Products.interfaces';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { BreadcrumComponent } from '../../../shared/components/breadcrum/breadcrum.component';
import { BreadcrumItem } from '../../../interfaces/Shared.interfaces';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { SizeSelectorComponent } from '../../../shared/components/size-selector/size-selector.component';
import { VariantSelected } from '../../../interfaces/Variant.interface';

@Component({
  selector: 'app-ind-product',
  standalone: true,
  imports: [
    CommonModule,
    BreadcrumComponent,
    CarouselComponent,
    SizeSelectorComponent,
  ],
  templateUrl: './ind-product.component.html',
  styleUrl: './ind-product.component.css',
})
export class IndProductComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  product!: IProductVM;

  loadingProduct = true;

  breadcrumItems: BreadcrumItem[] = [];

  selectedVariant!: VariantSelected;
  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductService
  ) {}

  ngOnInit(): void {
    this.blockUI.start('Cargando...');
    const productId = this._route.snapshot.params['productId'];
    this._productsService
      .getProductById(productId)
      .subscribe((res: ProductVM) => {
        if (res.HasErrors || res.HasWarnings) {
          return;
        }
        this.product = res.Items[0];
        this.generateBreadcrumItems();
        this.loadingProduct = false;
        this.blockUI.stop();
      });
  }

  generateBreadcrumItems(): void {
    this.breadcrumItems = [
      {
        Name: 'Productos',
        Href: '/Products',
      },
      {
        Name: this.product.CategoryName!,
        Href: `/Products?categories=${this.product.CategoryName!}`,
      },
      {
        Name: this.product.Name,
        Href: '',
      },
    ];
  }

  setVariant(variantSelected: VariantSelected) {
    this.selectedVariant = {
      ...variantSelected,
      ProductId: this.product.Id,
    };
  }

  addToCart() {
    if (!this.selectedVariant) return;

    console.log(this.selectedVariant);
  }
}
