import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { productsRoutesModel, routesModel } from '../../../Routes.model';
import { ModalService } from '../../Other/Services/modal.service';

@Injectable({
    providedIn: 'root'
})
export class ProductsStockNavigationService {

    constructor(private _router: Router) { }

    toStockForm(variantId: number) {
        this._router.navigate([`${routesModel.Stock}/${variantId}`]);
    }

    toStockDetails(productId: number) {
        this._router.navigate([`${routesModel.Products}/product/${productId}`]);
    }
}