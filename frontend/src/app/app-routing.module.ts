import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { foodPageDataGuard } from './shared/guards/food-page-data.guard';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { authGuard } from './shared/guards/auth.guard';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { MyOrdersPageComponent } from './components/pages/my-orders-page/my-orders-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { orderPaymentPageDataGuard } from './shared/guards/order-payment-page-data.guard';
import { ContactUsPageComponent } from './components/pages/contact-us-page/contact-us-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactUsPageComponent },
  { path: 'search/:searchTerm', component: HomeComponent },
  { path: 'tag/:tag', component: HomeComponent },
  {
    path: 'food/:id',
    resolve: {
      food: foodPageDataGuard, // Resolver to fetch food data
    },
    component: FoodPageComponent,
  },
  { path: 'cart-page', component: CartPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'payment/:orderId',
    component: PaymentPageComponent,
    resolve: {
      order: orderPaymentPageDataGuard,
    },
    canActivate: [authGuard],
  },
  {
    path: 'my-orders',
    component: MyOrdersPageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
