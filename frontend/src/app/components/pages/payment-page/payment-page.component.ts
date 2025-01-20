import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { WindowRefService } from '../../../shared/services/paymentServices/window-ref.service';
import { HttpClient } from '@angular/common/http';
import { PaymentService } from '../../../shared/services/paymentServices/payment.service';
import { AlertService } from '../../../shared/services/alert.service';
import { CartService } from '../../../shared/services/cart.service';

declare var Razorpay: any;
@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
  providers: [WindowRefService],
})
export class PaymentPageComponent {
  orderData: any;
  orderUserName: any;
  isCalledFromMyOrdersPage: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private windowRef: WindowRefService,
    private http: HttpClient,
    private router: Router,
    private paymentService: PaymentService,
    private alertService: AlertService,
    private cartService: CartService
  ) {}
  ngOnInit(): void {
    const orderResp = this.activatedRoute.snapshot.data['order'];
    this.orderData = orderResp.order;
    console.log(this.orderData);
    this.orderUserName = this.userService.currentUser.name;
    this.isCalledFromMyOrdersPage =
      this.paymentService.isCalledFromMyOrdersPage;
  }

  createPayment() {
    this.paymentService
      .createRazorpayOrderPayment(this.orderData._id)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.success) {
            this.payNow(response.payment.id);
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  payNow(paymentOrderId: string) {
    const options: any = {
      key: 'rzp_test_PbdA4UhH2LxA1k', // Replace with your Razorpay Key ID
      amount: this.orderData.totalPrice * 100, // Razorpay expects amount in paise
      currency: 'INR',
      name: 'Food Mine',
      description: 'Order Payment',
      //image: 'https://example.com/logo.png', // Replace with your logo URL
      order_id: paymentOrderId, // Optional: Generate and pass the Razorpay order ID from your backend
      handler: (response: any) => {
        console.log('Payment Success', response);
        this.handlePaymentSuccess(response, this.orderData.totalPrice * 100);
      },
      prefill: {
        name: this.orderUserName, // Replace with actual customer name
        email: this.orderData.email, // Replace with actual email
        contact: this.orderData.phoneNo, // Replace with actual phone number
      },
      notes: {
        address: this.orderData.address,
      },
      theme: {
        color: '#e72929', // Primary color
      },
    };

    const rzp = new Razorpay(options);

    rzp.open();
  }

  handlePaymentSuccess(response: any, amount: number) {
    const paymentDetails = {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    };
    console.log('paymentDetails', paymentDetails);
    this.paymentService
      .verifyPayment(paymentDetails, this.orderData._id, amount)
      .subscribe({
        next: (response: any) => {
          this.alertService.getSuccessAlert('Payment Successful.');
          this.cartService.clearCart();
          this.router.navigateByUrl('/my-orders');
        },
        error: (err) => {
          this.alertService.getErrorAlert('Payment Failed.');
        },
      });
  }

  cancelOrder(orderId: string) {
    this.alertService.confirmationCancelOrderAlert(
      'Are you sure you want to cancel the order?'
    );

    this.alertService.cancelOrderConfirmationObservable.subscribe({
      next: (isConfirmed: boolean) => {
        if (isConfirmed) {
          console.log('isConfirmed,', isConfirmed);
          this.paymentService
            .cancelOrder(orderId)
            .subscribe((response: any) => {
              if (response.success) {
                console.log(response);
                this.router.navigateByUrl('/my-orders');
              } else {
                this.alertService.getErrorAlert('Order Cancellation Failed.');
              }
            });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
