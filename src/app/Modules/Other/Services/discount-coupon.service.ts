import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environment/environment';
import { DiscountCoupon } from '../models/Discount-coupon-model';

@Injectable({
  providedIn: 'root'
})
export class DiscountCouponService {

  constructor(private _http: HttpClient) { }

  findDiscountCoupon(couponName: string): Observable<DiscountCoupon> {
    const params = new HttpParams().set('couponName', couponName);

    return this._http.get<DiscountCoupon>(
      `${environment.apiUrl}/checkout/DiscountCoupon`, { params }
    );
  }
}
