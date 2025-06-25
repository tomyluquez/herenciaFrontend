import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { CompanyInfoVM, ICompanyInfoVM } from '../Interfaces/Config.interface';
import { IConfig, SearchConfigList } from '../Interfaces/Config-list.interface';
import { ConfigVM } from '../Models/Config-list.model';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';
import { IDiscountCoupon, SearchCouponList } from '../../Other/Interface/DiscountCoupon.interface';
import { DiscountCouponPagedListVM } from '../../Other/Models/Discount-coupon-paged-list.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private cacheKey = 'hci'; // Clave de almacenamiento local
  private companyInfo!: ICompanyInfoVM[]; // Cache en memoria

  constructor(private _http: HttpClient) { }

  getCompanyInfo(): Observable<ICompanyInfoVM[]> {
    if (this.companyInfo) return of(this.companyInfo);
    const cachedData = localStorage.getItem(this.cacheKey);
    if (cachedData) {
      this.companyInfo = JSON.parse(cachedData);
      return of(this.companyInfo);
    }
    return this._http
      .get<CompanyInfoVM>(`${environment.apiUrl}/config/companyInfo`)
      .pipe(
        map((data: CompanyInfoVM) => {
          if (data.HasErrors || data.HasWarnings) {
            // Si hay errores o advertencias, retorna un array vacío o maneja el error según convenga
            return [];
          }
          this.companyInfo = data.Items;
          localStorage.setItem(this.cacheKey, JSON.stringify(this.companyInfo));
          return this.companyInfo;
        })
      );
  }

  getConfig(search: SearchConfigList): Observable<ConfigVM> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const params = new HttpParams()
      .set('page', search.Pagination.Page)
      .set('limit', search.Pagination.Limit)

    return this._http.get<ConfigVM>(`${environment.apiUrl}/config/getConfig`, { headers, params });
  }

  saveConfig(newConfig: IConfig): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });
    return this._http.post<ResponseMessages>(`${environment.apiUrl}/config/saveConfig`, newConfig, { headers });
  }
  getDiscountCoupons(search: SearchCouponList): Observable<DiscountCouponPagedListVM> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const params = new HttpParams()
      .set('page', search.Pagination.Page)
      .set('limit', search.Pagination.Limit)

    return this._http.get<DiscountCouponPagedListVM>(`${environment.apiUrl}/config/getDiscountCoupons`, { headers, params });
  }

  saveCoupon(newConfig: IDiscountCoupon): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });
    return this._http.post<ResponseMessages>(`${environment.apiUrl}/config/saveCoupon`, newConfig, { headers });
  }
}
