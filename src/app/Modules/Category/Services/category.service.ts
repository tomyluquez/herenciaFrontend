import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { PaginationEnum } from '../../Other/Enums/pagination-enum';
import { CategoryListVM, ICategoryVM, SearchCategoriesPagedList } from '../Interfaces/Categories.interface';
import { FilteringOptionsCategoryListVM } from '../Models/Filtering-options-category-list';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _http: HttpClient) { }

  getAllCategories(search: SearchCategoriesPagedList): Observable<CategoryListVM> {
    let params = new HttpParams().set('limit', search.Pagination.Limit)
      .set('page', search.Pagination.Page)
      .set('status', search.Status)
      .set('name', search.Name)

    return this._http.get<CategoryListVM>(`${environment.apiUrl}/categories`, {
      params,
    });
  }

  getFilteringOptionsCategoryList(): Observable<FilteringOptionsCategoryListVM> {
    return this._http.get<FilteringOptionsCategoryListVM>(`${environment.apiUrl}/categories/getFilteringOptionsCategoryList`);
  }

  saveCategory(newCategory: ICategoryVM): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });
    return this._http.post<ResponseMessages>(`${environment.apiUrl}/categories/saveCategory`, newCategory, { headers });
  }

  changeStatus(categoryId: number): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    })
    const params = new HttpParams().set('id', categoryId.toString());
    return this._http.put<ResponseMessages>(`${environment.apiUrl}/categories/changeStatus`, null, { headers, params });
  }
}
