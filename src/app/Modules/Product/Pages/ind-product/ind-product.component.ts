import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CommonModule } from '@angular/common';
import { BreadcrumComponent } from '../../../../shared/components/breadcrum/breadcrum.component';
import { BreadcrumItem } from '../../../Other/Interface/Shared.interfaces';
import { CarouselComponent } from '../../../../shared/components/carousel/carousel.component';
import { SizeSelectorComponent } from '../../../../shared/components/size-selector/size-selector.component';
import { AuthService } from '../../../Auth/Services/auth.service';
import { ResponseMessages } from '../../../Other/Interface/ResponseMessages.Interface';
import { IProduct, Products } from '../../Interface/Products.interfaces';
import { VariantSelected } from '../../../Variant/Interface/Variant.interface';
import { CartService } from '../../../Cart/Services/cart.service';
import { AlertService } from '../../../Other/Services/alert.service';

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
export class IndProductComponent implements OnInit, AfterViewInit {
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
    this.blockUI.start();
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

  ngAfterViewInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    this.blockUI.start();
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
        this.blockUI.stop();
        this._alertService.showAlerts(res);
      });
  }
}
