import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../models/User';
import { IUserLogin } from '../Interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../constants/urls';
import { AlertService } from './alert.service';
import { USER_KEY } from '../constants/userData';
import { IUserRegister } from '../Interfaces/IUserRegister';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(
    this.getUserFromLocalStorage()
  );
  public userObservable: Observable<User>;
  constructor(private http: HttpClient, private alertService: AlertService) {
    //We use the userObservable outside the service as BehaviorSubject can read/write and Observable can only read.
    this.userObservable = this.userSubject.asObservable();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(BACKEND_URL + '/users/signIn', userLogin).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.alertService.getSuccessAlert('Login Successfully');
        },
        error: (err) => {
          this.alertService.getErrorAlert('Invalid Credentials');
        },
      })
    );
  }

  register(userRegister: any) {
    return this.http
      .post<User>(BACKEND_URL + '/users/signUp', userRegister)
      .pipe(
        tap({
          next: (user: any) => {
            this.setUserToLocalStorage(user);
            this.userSubject.next(user);
            this.alertService.getSuccessAlert('Register Successfully');
          },
          error: (err) => {
            this.alertService.getErrorAlert('Register failed.');
          },
        })
      );
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.clear();
    window.location.reload();
  }
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userItem = localStorage.getItem(USER_KEY);
    if (userItem) return JSON.parse(userItem);
    return new User();
  }

  public getToken() {
    const userData = this.getUserFromLocalStorage();
    let token = userData?.token;
    return token;
  }
}
