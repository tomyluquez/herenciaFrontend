import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SizeLlistVM } from '../interfaces/Size.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SizesService {
  constructor(private _http: HttpClient) {}

  getSizeList(status = ''): Observable<SizeLlistVM> {
    let params = new HttpParams().set('status', status);
    return this._http.get<SizeLlistVM>(`${environment.apiUrl}/sizes/sizeList`, {
      params,
    });
  }
}
