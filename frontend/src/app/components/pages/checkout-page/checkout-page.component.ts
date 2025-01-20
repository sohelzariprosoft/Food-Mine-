import { Component } from '@angular/core';
import { Order } from '../../../models/Order';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../shared/services/cart.service';
import { UserService } from '../../../shared/services/user.service';
import { AlertService } from '../../../shared/services/alert.service';
import { LocationService } from '../../../shared/services/location.service';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { PaymentService } from '../../../shared/services/paymentServices/payment.service';
// import intlTelInput from 'intl-tel-input';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  order: Order = new Order();
  isSubmitted: boolean = false;
  checkoutForm!: FormGroup;
  countryCodes: string[] = ['+44', '+91', '+61', '+81']; // Add more country codes as needed
  //mapAddresss: string = '';
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private locationService: LocationService,
    private orderService: OrderService,
    private router: Router,
    private paymentService: PaymentService
  ) {
    const cart = cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }

  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, Validators.required],
      address: [address, Validators.required],
      countryCode: ['+91', Validators.required], // Default country code
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)], // Phone number validation
      ],
      paymentMethod: ['COD', Validators.required], // Add payment method
    });

    //For adding address in address input
    this.locationService.addressMap.subscribe({
      next: (address: string) => {
        //this.mapAddresss = address;
        this.checkoutForm.patchValue({
          address: address,
        });
      },
    });

    //this.convertInputToTelInput();
  }

  // convertInputToTelInput() {
  //   const inpTelElement: HTMLInputElement = document.getElementById(
  //     'phone'
  //   ) as HTMLInputElement;
  //   console.log(inpTelElement);
  //   if (inpTelElement) {
  //     intlTelInput(inpTelElement, {
  //       initialCountry: 'IN',
  //       separateDialCode: true,
  //       preferredCountries: ['IN', 'US', 'GB'],
  //       utilsScript: './node_modules/intl-tel-input/build/js/utils.js',
  //     } as any);
  //   }
  // }
  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    this.isSubmitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }
    if (!this.order.addressLatLng) {
      this.order.addressLatLng = this.locationService.currentLocation;
    }
    const foodItems: any[] = this.order.items.map((item: any) => {
      return {
        food: item.food.id,
        quantity: item.quantity,
      };
    });
    const { lat, lng } = this.order.addressLatLng;
    const phoneNo =
      this.checkoutForm.value['countryCode'] +
      ' ' +
      this.checkoutForm.value['phoneNumber'];
    let reqFoodBody = {
      foodItemsData: foodItems,
      email: this.userService.currentUser.email,
      address: this.checkoutForm.value['address'],
      phoneNo,
      lat,
      lng,
      postalCode: this.locationService.currentPostalCode,
      paymentMethod: this.checkoutForm.value['paymentMethod'],
    };
    console.log(reqFoodBody);
    this.orderService.create(reqFoodBody).subscribe({
      next: (order: any) => {
        console.log(order);
        if (
          order.newOrder.paymentMethod === 'UPI' &&
          order.newOrder.paymentStatus === 'Pending'
        ) {
          this.paymentService.isCalledFromMyOrdersPage = false;
          this.router.navigateByUrl('/payment/' + order.newOrder._id);
        } else {
          this.alertService.getSuccessAlert('Order placed successfully', '');
          this.cartService.clearCart();
          this.router.navigateByUrl('/my-orders');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
