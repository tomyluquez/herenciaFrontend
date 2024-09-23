import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryListVM } from '../interfaces/Categories.interface';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) {}

  getAllCategories(): Observable<CategoryListVM> {
    return this._http.get<CategoryListVM>(`${environment.apiUrl}/categories`);
  }
}
