import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ISizeListVM, SearchSizePagedList, } from '../Interface/Size.interface';
import { SizeLlistVM } from '../Models/Size-list.model';
import { FilteringOptionsSizeListVM } from '../Models/Filtering-options-size.list';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';

@Injectable({
  providedIn: 'root',
})
export class SizesService {
  constructor(private _http: HttpClient) { }

  getSizeList(search: SearchSizePagedList): Observable<SizeLlistVM> {
    let params = new HttpParams()
      .set('limit', search.Pagination.Limit)
      .set('page', search.Pagination.Page)
      .set('status', search.Status)
      .set('name', search.Name)

    return this._http.get<SizeLlistVM>(`${environment.apiUrl}/sizes/sizeList`, {
      params,
    });
  }

  getFilteringOptionsSizeList(): Observable<FilteringOptionsSizeListVM> {
    return this._http.get<FilteringOptionsSizeListVM>(`${environment.apiUrl}/sizes/getFilteringOptionsSizeList`);
  }

  changeStatus(sizeId: number): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    })
    const params = new HttpParams().set('id', sizeId.toString());
    return this._http.put<ResponseMessages>(`${environment.apiUrl}/sizes/changeStatus`, null, { headers, params });
  }

  saveSize(newSize: ISizeListVM): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });
    return this._http.post<ResponseMessages>(`${environment.apiUrl}/sizes/saveSize`, newSize, { headers });
  }
}
