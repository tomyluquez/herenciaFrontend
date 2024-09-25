import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import {
  ProductPagedListSearchDTO,
  ProductPagedListVM,
  PromotionalProductsVM,
} from '../interfaces/Products.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  getPromotionalProducts(): Observable<PromotionalProductsVM> {
    return this._http.get<PromotionalProductsVM>(
      `${environment.apiUrl}/products/promotional`
    );
  }

  getPagedListProducts(
    queryParams: ProductPagedListSearchDTO
  ): Observable<ProductPagedListVM> {
    const params = new HttpParams()
      .set('name', queryParams.Name)
      .set('categories', queryParams.Categories)
      .set('sizes', queryParams.Sizes)
      .set('page', queryParams.Pagination.Page)
      .set('limit', queryParams.Pagination.Limit)
      .set('order', queryParams.Order);
    return this._http.get<ProductPagedListVM>(
      `${environment.apiUrl}/products/pagedList`,
      { params }
    );
  }
}
