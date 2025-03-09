import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { routesModel } from '../../../Routes.model';

@Injectable({
    providedIn: 'root'
})
export class ProductNavigationService {

    constructor(private _router: Router) { }

    toProductForm(productId: number) {
        this._router.navigate([`${routesModel.Products}/${productId}`]);
    }

    toProductDetails(productId: number) {
        this._router.navigate([`${routesModel.Products}/product/${productId}`]);
    }
}