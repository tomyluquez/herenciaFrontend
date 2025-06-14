import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { Router } from '@angular/router';
import { LoginUser, RegisterUser } from '../../User/Interface/User.interface';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { ResponseMessages } from '../../Other/Interface/ResponseMessages.Interface';
import { UserRoleEnum } from '../../User/Enums/user-role-enum';
import { UserTokenVM } from '../../User/Models/User.Token.model';
import { UserProfile } from '../Models/User-profile';

@Injectable({
    providedIn: 'root',
})
export class UserService {


    constructor(private _http: HttpClient) {
    }

    getUserProfileByUserName(userName: string): Observable<UserProfile> {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
        });

        const params = new HttpParams()
            .set('userName', userName)

        const options = { headers, params }
        return this._http.get<UserProfile>(
            `${environment.apiUrl}/users/getUserProfileByUserName`, options)
    }

}
