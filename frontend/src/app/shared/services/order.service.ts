import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../../models/Order';
import { BACKEND_URL } from '../constants/urls';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private userService: UserService) {}
  create(order: any) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Order>(BACKEND_URL + '/orders/createOrder', order, {
      headers,
    });
  }

  getOrders() {
    return this.http.get(BACKEND_URL + '/orders');
  }

  getOrderById(id: string) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(BACKEND_URL + '/orders/getOrderById/' + id, {
      headers,
    });
  }

  getOrdersByUserEmail(email: string) {
    const token = this.userService.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(BACKEND_URL + '/orders/getOrdersByEmail/' + email, {
      headers,
    });
  }
}
