import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryListVM } from '../interfaces/Categories.interface';
import { environmentDev } from '../../environment/environment.develop';
import { PromotionalProductsVM } from '../interfaces/Products.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  getPromotionalProducts(): Observable<PromotionalProductsVM> {
    return this._http.get<PromotionalProductsVM>(
      `${environmentDev.apiUrl}/products/promotional`
    );
  }
}
