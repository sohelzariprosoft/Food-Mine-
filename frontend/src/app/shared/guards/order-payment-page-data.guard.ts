import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Food } from '../../models/Food';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';

export const orderPaymentPageDataGuard: ResolveFn<Observable<any>> = (
  route,
  state
) => {
  const orderService = inject(OrderService);
  const orderId = route.paramMap.get('orderId'); // Access the 'id' parameter from the route
  return orderService.getOrderById(orderId ? orderId.toString() : '');
};
