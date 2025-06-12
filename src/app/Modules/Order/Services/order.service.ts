import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilteringOptionsOrderListVM } from '../Models/Filtering-options-order-list.model';
import { environment } from '../../../../environment/environment';
import { SearchOrderPagedList } from '../Interface/order-list.interface';
import { OrderVM } from '../Models/Order.model';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';
import { OrderDetail } from '../Models/Order-detail.model';
import { IOrderDetail } from '../Interface/order-detail.interface';
import { SaveOrderResponse } from '../Models/SaveOrderResponse';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http: HttpClient) { }

  getFilteringOptionsOrderList(onlyOptions: boolean): Observable<FilteringOptionsOrderListVM> {
    const params = new HttpParams().set('onlyOptions', onlyOptions.toString());
    return this._http.get<FilteringOptionsOrderListVM>(`${environment.apiUrl}/orders/getFilteringOptionsOrderList`, { params });
  }

  getOrders(search: SearchOrderPagedList): Observable<OrderVM> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    const params = new HttpParams()
      .set('customerName', search.CustomerName)
      .set('page', search.Pagination.Page)
      .set('limit', search.Pagination.Limit)
      .set('orderStatus', search.OrderStatus)
      .set('orderNumber', search.OrderNumber)
      .set('startDate', search.StartDate.toString())
      .set('endDate', search.EndDate.toString())

    const options = { headers, params }

    return this._http.get<OrderVM>(
      `${environment.apiUrl}/orders/getOrders`, options)
  }

  changeStatusOrder(orderId: number, orderStatusId: number): Observable<ResponseMessages> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    const params = new HttpParams()
      .set('orderId', orderId)
      .set('orderStatusId', orderStatusId)

    const options = { headers, params }

    return this._http.put<ResponseMessages>(
      `${environment.apiUrl}/orders/changeStatusOrder`, {}, options)
  }

  getOrderDetailById(orderId: number): Observable<OrderDetail> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    const params = new HttpParams()
      .set('orderId', orderId)

    const options = { headers, params }
    return this._http.get<OrderDetail>(
      `${environment.apiUrl}/orders/getOrderDetailById`, options)
  }

  saveOrder(order: IOrderDetail): Observable<SaveOrderResponse> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this._http.post<SaveOrderResponse>(`${environment.apiUrl}/orders/saveOrder`, order, { headers });
  }
}
