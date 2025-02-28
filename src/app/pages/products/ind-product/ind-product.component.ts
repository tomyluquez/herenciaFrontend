import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { IProduct, Products } from '../../../interfaces/Products.interfaces';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { BreadcrumComponent } from '../../../shared/components/breadcrum/breadcrum.component';
import { BreadcrumItem } from '../../../interfaces/Shared.interfaces';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { SizeSelectorComponent } from '../../../shared/components/size-selector/size-selector.component';
import { VariantSelected } from '../../../interfaces/Variant.interface';
import { CartService } from '../../../services/cart.service';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth.service';
import { ResponseMessages } from '../../../interfaces/ResponseMessages.Interface';

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
  product!: IProduct;

  loadingProduct = true;

  breadcrumItems: BreadcrumItem[] = [];

  selectedVariant!: VariantSelected;
  constructor(
    private _route: ActivatedRoute,
    private _productsService: ProductService,
    private _cartService: CartService,
    private _alertService: AlertService,
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.blockUI.start('Cargando...');
    const productId = this._route.snapshot.params['productId'];
    this._productsService
      .getProductById(productId)
      .subscribe((res: Products) => {
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
    };
  }

  async addToCart() {
    if (!this.selectedVariant) return;
    const token = this._authService.getToken();
    const userId = this._authService.getUserIdByToken(token);

    if (!userId) {
      this._router.navigate(['/Login']);
    }

    this.selectedVariant.UserId = userId;

    this._cartService
      .addItemToCart(this.selectedVariant)
      .subscribe((res: ResponseMessages) => {
        this._alertService.showAlerts(res);
      });
  }
}
