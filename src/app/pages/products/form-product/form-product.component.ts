import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from './../../../models/Product.model';
import { IProduct, Products } from '../../../interfaces/Products.interfaces';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.css'
})
export class FormProductComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  productId?: number;
  product!: IProduct

  constructor(private _route: ActivatedRoute, private _productService: ProductService, private _alertService: AlertService) {
    const productId = this._route.snapshot.params['productId'];
    if (productId) this.productId = productId;
  }

  ngOnInit() {
    this.init();
  }

  init() {
    this.blockUI.start('Cargando...');
    if (this.productId) {
      this._productService.getProductById(this.productId).subscribe((res: Products) => {
        if (res.HasErrors) {
          this._alertService.showAlerts(res);
          this.blockUI.stop();
          return;
        }

        this.product = res.Items[0];
        this.blockUI.stop();
      })
    }
  }
}
