import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { CompanyInfoVM, ICompanyInfoVM } from '../interfaces/Config.interface';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private cacheKey = 'hci'; // Clave de almacenamiento local
  private companyInfo!: ICompanyInfoVM[]; // Cache en memoria

  constructor(private _http: HttpClient) {}

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
}
