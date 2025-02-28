import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { productsRoutesModel, routesModel } from '../../models/Routes.model';
import { ModalService } from '../modal.service';

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