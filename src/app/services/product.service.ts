import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { PromotionalProductsVM } from '../interfaces/Products.interfaces';

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
}
