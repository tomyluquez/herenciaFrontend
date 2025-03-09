import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { ICartItemsVM, UpdateQuantityCartItem } from '../Interfaces/Cart.interface';
import { AuthService } from '../../Auth/Services/auth.service';
import { VariantSelected } from '../../Variant/Interface/Variant.interface';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';
import { environment } from '../../../../environment/environment';
import { UserCartItemsVM } from '../../User/Models/User.Cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<ICartItemsVM[]>(
    [] as ICartItemsVM[]
  );
  cartItems$ = this.cartItemsSubject.asObservable();
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _authService: AuthService
  ) { }

  addItemToCart(
    variantSelected: VariantSelected
  ): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    return this._http
      .post<ResponseMessages>(
        `${environment.apiUrl}/cart/cartItem`,
        variantSelected,
        { headers }
      )
      .pipe(
        tap((response: ResponseMessages) => {
          if (!response.HasErrors) {
            // Si el producto se ha agregado exitosamente, volvemos a obtener los items del carrito
            this.updateCartItems();
          }
        }),
        catchError((error: any) => {
          const response = new ResponseMessages();
          response.HasErrors = true;
          response.ErrorMessages = [
            error.error.message || 'Ha ocurrido un error inesperado.',
          ];
          if (error.status === 401) {
            this._router.navigate(['/Login']);
          }
          return of(response); // Devuelve un observable con el ResponseMessages
        })
      );
  }

  getCartItemsByUserId(): Observable<UserCartItemsVM> {
    const token = localStorage.getItem('token');
    const userId = this._authService.getUserIdByToken(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const params = new HttpParams().set('userId', userId);

    return this._http.get<UserCartItemsVM>(
      `${environment.apiUrl}/cart/cartItems/`,
      { params, headers }
    );
  }

  updateCartItems() {
    this.getCartItemsByUserId().subscribe((res: UserCartItemsVM) => {
      if (!res.HasErrors && res.Items) {
        this.cartItemsSubject.next(res.Items);
      }
    });
  }

  removeItemToCart(itemId: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this._http
      .delete<ResponseMessages>(`${environment.apiUrl}/cart/cartItem`, {
        body: {
          itemId: itemId.toString(),
        },
        headers,
      })
      .pipe(
        tap((response: ResponseMessages) => {
          if (!response.HasErrors) {
            // Si el producto se ha elimino exitosamente, volvemos a obtener los items del carrito
            this.updateCartItems();
          }
        }),
        catchError((error: any) => {
          const response = new ResponseMessages();
          response.HasErrors = true;
          response.ErrorMessages = [
            error.error.message || 'Ha ocurrido un error inesperado.',
          ];
          if (error.status === 401) {
            this._router.navigate(['/Login']);
          }
          return of(response); // Devuelve un observable con el ResponseMessages
        })
      );
  }

  updateQuantityCartItem(
    itemToUpdate: UpdateQuantityCartItem
  ): Observable<ResponseMessages> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
    });

    return this._http
      .post<ResponseMessages>(
        `${environment.apiUrl}/cart/cartItems`,
        itemToUpdate,
        { headers }
      )
      .pipe(
        tap((response: ResponseMessages) => {
          if (!response.HasErrors) {
            // Si el producto se ha agregado exitosamente, volvemos a obtener los items del carrito
            this.updateCartItems();
          }
        }),
        catchError((error: any) => {
          const response = new ResponseMessages();
          response.HasErrors = true;
          response.ErrorMessages = [
            error.error.message || 'Ha ocurrido un error inesperado.',
          ];
          if (error.status === 401) {
            this._router.navigate(['/Login']);
          }
          return of(response); // Devuelve un observable con el ResponseMessages
        })
      );
  }

}
