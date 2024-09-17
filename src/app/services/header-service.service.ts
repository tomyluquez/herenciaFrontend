import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environmentDev } from '../../environment/environment.develop';
import { Observable } from 'rxjs';
import { IMenuVM, MenuVM } from '../interfaces/Menu.Interfaces';

@Injectable({
  providedIn: 'root',
})
export class HeaderServiceService {
  apiUrl = environmentDev.apiUrl;

  constructor(private _http: HttpClient) {}

  getMenuHeaderDB(): Observable<MenuVM> {
    let params = new HttpParams().set('status', 'inactive');

    return this._http.get<MenuVM>(`${this.apiUrl}/config/menuInfo`, { params });
  }

  getMenuHeaderLocal(): IMenuVM[] {
    return JSON.parse(localStorage.getItem('header-menu')!);
  }
}
