import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { SizeLlistVM } from '../Interface/Size.interface';

@Injectable({
  providedIn: 'root',
})
export class SizesService {
  constructor(private _http: HttpClient) { }

  getSizeList(status = -1): Observable<SizeLlistVM> {
    let params = new HttpParams()
    if (status >= 0) {
      params.set('status', status);
    }
    return this._http.get<SizeLlistVM>(`${environment.apiUrl}/sizes/sizeList`, {
      params,
    });
  }
}
