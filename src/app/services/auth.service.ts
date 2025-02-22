import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryListVM } from '../interfaces/Categories.interface';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { LoginUser, RegisterUser } from '../interfaces/User.interface';
import { ResponseMessages } from '../interfaces/ResponseMessages.Interface';
import { UserTokenVM } from '../models/User/User.Token.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLogged$ = this.loggedIn.asObservable();

  userId!: number;

  constructor(private _http: HttpClient, private _router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Revisa si hay un token almacenado
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  get Role(): string {
    return localStorage.getItem('role') || 'customer';
  }

  login(infoUser: LoginUser): Observable<UserTokenVM> {
    return this._http.post<UserTokenVM>(
      `${environment.apiUrl}/users/login`,
      infoUser
    );
  }

  setBehaivor() {
    this.loggedIn.next(this.isLoggedIn());
  }

  logout() {
    localStorage.removeItem('token');
    this.setBehaivor();
    this._router.navigate(['/Login']);
  }

  register(infoUser: RegisterUser): Observable<ResponseMessages> {
    return this._http.post<UserTokenVM>(
      `${environment.apiUrl}/users/register`,
      infoUser
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.setBehaivor();
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
  }

  getUserIdByToken(token: string | null): number {
    if (!token) return 0;

    const decodedToken: any = jwtDecode(token);
    return +decodedToken.id;
  }
}
