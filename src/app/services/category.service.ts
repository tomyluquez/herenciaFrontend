import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryListVM } from '../interfaces/Categories.interface';
import { environment } from '../../environment/environment';
import { PaginationEnum } from '../enums/pagination-enum';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) { }

  getAllCategories(status = '', page = PaginationEnum.Page): Observable<CategoryListVM> {
    let params = new HttpParams().set('status', status).set('limit', page * PaginationEnum.Limit);
    return this._http.get<CategoryListVM>(`${environment.apiUrl}/categories`, {
      params,
    });
  }
}
