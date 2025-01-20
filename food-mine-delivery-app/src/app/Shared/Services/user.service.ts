import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SIGN_IN_URL, SIGN_UP_URL } from '../constants/BackendURL';
import { Observable } from 'rxjs';
import { localStorageUserToken } from '../constants/UserConstants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loginUser(userBody: any): Observable<any> {
    return this.http.post(SIGN_IN_URL, userBody);
  }

  registerUser(userRegisterBody: any): Observable<any> {
    return this.http.post(SIGN_UP_URL, userRegisterBody);
  }

  public getToken() {
    const userToken = localStorage.getItem(localStorageUserToken);
    if (userToken) return JSON.parse(userToken);
  }
}
