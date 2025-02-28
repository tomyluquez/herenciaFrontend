import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import {
  SearchProductPagedList,
  ProductPagedList,
  Products,
  PromotionalProducts,
} from '../interfaces/Products.interfaces';
import { PaginationEnum } from '../enums/pagination-enum';
import { ResponseMessages } from '../interfaces/ResponseMessages.Interface';
import { ChangeStatus } from '../interfaces/Others.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) { }

  getPromotionalProducts(page = PaginationEnum.Page): Observable<PromotionalProducts> {
    let params = new HttpParams().set('limit', page * PaginationEnum.Limit);
    return this._http.get<PromotionalProducts>(
      `${environment.apiUrl}/products/promotional`, { params }
    );
  }

  getPagedListProducts(
    queryParams: SearchProductPagedList
  ): Observable<ProductPagedList> {
    const params = new HttpParams()
      .set('name', queryParams.Name)
      .set('categories', queryParams.Categories)
      .set('sizes', queryParams.Sizes)
      .set('page', queryParams.Pagination.Page)
      .set('limit', queryParams.Pagination.Limit)
      .set('order', queryParams.Order)
      .set('status', queryParams.Status);
    return this._http.get<ProductPagedList>(
      `${environment.apiUrl}/products/pagedList`,
      { params }
    );
  }

  getProductById(productId: number): Observable<Products> {
    const params = new HttpParams().set('id', productId.toString());
    return this._http.get<Products>(`${environment.apiUrl}/products/product`, {
      params,
    });
  }

  changeStatus(status: ChangeStatus): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    const params = new HttpParams()
      .set('id', status.Id.toString())
      .set('status', status.Status.toString());

    const options = { headers, params };

    return this._http.put<ResponseMessages>(
      `${environment.apiUrl}/products/product`,
      null,
      options
    );
  }

}
