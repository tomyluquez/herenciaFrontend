import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import {
  SearchProductPagedList,
  ProductPagedList,
  PromotionalProducts,
  IProduct,
  Products,
} from '../Interface/Products.interfaces';
import { PaginationEnum } from '../../Other/Enums/pagination-enum';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';
import { ChangeStatus } from '../../Other/Interface/Others.interface';
import { FilteringOptionsPagedListProductVM } from '../Models/Filtering-options-paged-list-product.model';
import { ProductToSale } from '../Models/Products.model';
import { SearchCategoriesPagedList } from '../../Category/Interfaces/Categories.interface';
import { HomeInfoResponse } from '../../Other/Models/Home-info.model';

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
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

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
      { headers, params }
    );
  }

  getProductsToSale(
    queryParams: SearchProductPagedList
  ): Observable<ProductToSale> {
    const params = new HttpParams()
      .set('name', queryParams.Name)
      .set('categories', queryParams.Categories)
      .set('sizes', queryParams.Sizes)
      .set('page', queryParams.Pagination.Page)
      .set('limit', queryParams.Pagination.Limit)
      .set('order', queryParams.Order)
      .set('status', queryParams.Status);
    return this._http.get<ProductToSale>(
      `${environment.apiUrl}/products/getProductsToSale`,
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

  saveProduct(product: IProduct): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });
    return this._http.post<ResponseMessages>(
      `${environment.apiUrl}/products/saveProduct`,
      product,
      { headers }
    );
  }

  getFilteringOptionsPagedListProduct(): Observable<FilteringOptionsPagedListProductVM> {
    return this._http.get<FilteringOptionsPagedListProductVM>(`${environment.apiUrl}/products/getFilteringOptionsPagedListProduct`);
  }

  getHomeInfo(search: SearchCategoriesPagedList): Observable<HomeInfoResponse> {
    let params = new HttpParams().set('limit', search.Pagination.Limit)
      .set('page', search.Pagination.Page)
      .set('status', search.Status)
      .set('name', search.Name)

    return this._http.get<HomeInfoResponse>(`${environment.apiUrl}/products/getHomeInfo`, {
      params,
    });
  }
}
