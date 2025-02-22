import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryListVM } from '../interfaces/Categories.interface';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';
import { LoginUser, RegisterUser } from '../interfaces/User.interface';
import { ResponseMessages } from '../interfaces/ResponseMessages.Interface';
import { UserTokenVM } from '../models/User/User.Token.model';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { RoleEnum } from '../enums/role-enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: WritableSignal<boolean> = signal(false);

  userId!: number;

  constructor(private _http: HttpClient, private _router: Router) {
    this.setLoggedIn(this.isLoggedIn());
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Revisa si hay un token almacenado
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): number {
    return Number(localStorage.getItem('role')) || RoleEnum.Customer;
  }

  login(infoUser: LoginUser): Observable<UserTokenVM> {
    return this._http.post<UserTokenVM>(
      `${environment.apiUrl}/users/login`,
      infoUser
    );
  }

  setLoggedIn(value = true) {
    this.loggedIn.set(value);
  }

  getLoggedIn(): boolean {
    return this.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.setLoggedIn(false);
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
