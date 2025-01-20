import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user.service';
import { BACKEND_URL } from '../../constants/urls';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  isCalledFromMyOrdersPage: boolean = false;
  constructor(private http: HttpClient, private userService: UserService) {}

  createRazorpayOrderPayment(orderId: string) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      BACKEND_URL + '/payment/pay',
      { orderId },
      { headers }
    );
  }

  verifyPayment(signatureData: any, orderId: string, amount: number) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const paymentData = { ...signatureData, amount };
    return this.http.post(
      BACKEND_URL + '/payment/verifySignature/' + orderId,
      paymentData,
      { headers }
    );
  }

  cancelOrder(orderId: string) {
    const token = this.userService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      BACKEND_URL + '/orders/cancelOrder/' + orderId,
      {},
      { headers }
    );
  }
}
