import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ACCEPT_ORDER_TO_DELIVER,
  ORDER_TO_DELIVER,
} from '../constants/BackendURL';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private userService: UserService) {}
  detailModal: any;
  getOrdersForDeliveryByPostalCode() {
    const token = this.userService.getToken();
    console.log(token);
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(headers);
    return this.http.get(ORDER_TO_DELIVER, { headers });
  }

  acceptOrder(orderId: string) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const reqBody = { orderId: orderId };
    return this.http.post(ACCEPT_ORDER_TO_DELIVER, reqBody, { headers });
  }
}
