import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import {
  ProductPagedListSearchDTO,
  ProductPagedListVM,
  ProductVM,
  PromotionalProductsVM,
} from '../interfaces/Products.interfaces';
import { PaginationEnum } from '../enums/pagination-enum';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) { }

  getPromotionalProducts(page = PaginationEnum.Page): Observable<PromotionalProductsVM> {
    let params = new HttpParams().set('limit', page * PaginationEnum.Limit);
    return this._http.get<PromotionalProductsVM>(
      `${environment.apiUrl}/products/promotional`, { params }
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

  getProductById(productId: number): Observable<ProductVM> {
    const params = new HttpParams().set('id', productId.toString());
    return this._http.get<ProductVM>(`${environment.apiUrl}/products/product`, {
      params,
    });
  }
}
