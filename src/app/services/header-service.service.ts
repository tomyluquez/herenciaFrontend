import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { IMenuVM, MenuVM } from '../interfaces/Menu.Interfaces';
import Menus from '../data/menues.json';

@Injectable({
  providedIn: 'root',
})
export class HeaderServiceService {
  apiUrl = environment.apiUrl;
  menues = Menus.Items;

  constructor(private _http: HttpClient) {}

  getMenuHeaderDB(): Observable<MenuVM> {
    let params = new HttpParams().set('status', 'inactive');

    return this._http.get<MenuVM>(`${this.apiUrl}/config/menuInfo`, { params });
  }

  getMenuHeaderLocal(): IMenuVM[] {
    return this.menues;
  }
}
