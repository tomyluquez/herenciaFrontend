import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';
import { ProductStockVM, SearchProductsStockPagedList } from '../Interface/Variant.interface';
import { FilteringOptionsProductStockVM } from '../Models/Filtering-options-product-stock.model';

@Injectable({
  providedIn: 'root'
})
export class VariantsService {
  constructor(private _http: HttpClient) { }

  getProductsStock(queryParams: SearchProductsStockPagedList): Observable<ProductStockVM> {
    const params = new HttpParams()
      .set('page', queryParams.Pagination.Page)
      .set('limit', queryParams.Pagination.Limit)
      .set('status', queryParams.Status)
      .set('productName', queryParams.ProductName)
      .set('sizeId', queryParams.SizeId)
      .set('categoryId', queryParams.CategoryId)
    return this._http.get<ProductStockVM>(
      `${environment.apiUrl}/variants/getProductsStock`,
      { params }
    );
  }

  updateStock(variantId: number, quantity: number): Observable<ResponseMessages> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    const params = new HttpParams()
      .set('variantId', variantId)
      .set('quantity', quantity)

    const options = { headers, params }

    return this._http.put<ResponseMessages>(
      `${environment.apiUrl}/variants/updateStock`, null, options)
  }

  getFilteringOptionsProductStock(): Observable<FilteringOptionsProductStockVM> {
    return this._http.get<FilteringOptionsProductStockVM>(`${environment.apiUrl}/variants/getFilteringOptionsProductStock`);
  }
}
