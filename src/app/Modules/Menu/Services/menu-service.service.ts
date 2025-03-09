import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { Observable } from 'rxjs';
import Menus from '../../../data/menues.json';
import { IMenuVM, MenuVM } from '../Interface/Menu.Interfaces';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  apiUrl = environment.apiUrl;
  menues = Menus.Items;

  constructor(private _http: HttpClient) { }

  getMenuHeaderDB(userRole = 0): Observable<MenuVM> {
    let params = new HttpParams().set('userRole', userRole);

    return this._http.get<MenuVM>(`${this.apiUrl}/config/menuInfo`, { params });
  }

  getMenuHeaderLocal(): IMenuVM[] {
    return this.menues;
  }
}
