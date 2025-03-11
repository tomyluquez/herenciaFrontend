import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilteringOptionsPriceListVM } from '../Models/Filtering-options-price-list.model';
import { environment } from '../../../../environment/environment';
import { PriceListProductsVM } from '../Models/Price-list-list.model';
import { PriceListProductsSearch, UpdateAllPriceProduct, UpdatePriceProduct } from '../Interface/Price-list.interface';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {

  constructor(private _htpp: HttpClient) { }

  getFilteringOptionsPriceList(): Observable<FilteringOptionsPriceListVM> {
    return this._htpp.get<FilteringOptionsPriceListVM>(`${environment.apiUrl}/products/getFilteringOptionsPriceList`);
  }

  getPriceListProducts(search: PriceListProductsSearch): Observable<PriceListProductsVM> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('page', search.Pagination.Page)
      .set('limit', search.Pagination.Limit)
      .set('productName', search.ProductName)
      .set('category', search.CategoryId);



    return this._htpp.get<PriceListProductsVM>(`${environment.apiUrl}/products/getPriceListProducts`, { headers, params });
  }

  updatePriceProduct(product: UpdatePriceProduct): Observable<ResponseMessages> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('productId', product.ProductId)
      .set('price', product.Price)
      .set('discount', product.Discount)
      .set('promotionalPrice', product.PromotionalPrice);

    return this._htpp.put<ResponseMessages>(`${environment.apiUrl}/products/updatePriceProduct`, null, { headers, params });
  }

  updateAllProductsPrice(update: UpdateAllPriceProduct): Observable<ResponseMessages> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    const params = new HttpParams()
      .set('actionType', update.ActionType)
      .set('discount', update.Discount || 0)
      .set('percentage', update.Percentage || 0)
      .set('categoryId', update.CategoryId || 0);

    return this._htpp.put<ResponseMessages>(`${environment.apiUrl}/products/updateAllProductsPrice`, null, { headers, params });

  }
}
