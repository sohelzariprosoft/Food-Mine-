import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/partials/header/header.component';
import { HomeComponent } from './components/pages/home/home.component';
import { StarRatingsComponent } from './components/partials/star-ratings/star-ratings.component';
import { SearchComponent } from './components/partials/search/search.component';
import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { TitleComponent } from './components/partials/title/title.component';
import { NotFoundComponent } from './components/partials/not-found/not-found.component';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { getDataAPIInterceptor } from './shared/interceptors/get-data-api.interceptor';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { postDataAPIInterceptor } from './shared/interceptors/post-data-api.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { apiErrorHandlerInterceptor } from './shared/interceptors/api-error-handler.interceptor';
import { GlobalErrorHandlerService } from './shared/services/global-error-handler.service';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { LoadingComponent } from './components/partials/loading/loading.component';
import { loadingInterceptor } from './shared/interceptors/loading.interceptor';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';
import { OrderItemsListComponent } from './components/partials/order-items-list/order-items-list.component';
import { MapComponent } from './components/partials/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { PaymentPageComponent } from './components/pages/payment-page/payment-page.component';
import { ProfilePageComponent } from './components/pages/profile-page/profile-page.component';
import { MyOrdersPageComponent } from './components/pages/my-orders-page/my-orders-page.component';

//Prime Ng modules UI
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Rating, RatingModule } from 'primeng/rating';
import { Ng2SmartTableComponent, Ng2SmartTableModule } from 'ng2-smart-table';
import { ContactUsPageComponent } from './components/pages/contact-us-page/contact-us-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    StarRatingsComponent,
    SearchComponent,
    TagsComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    LoginPageComponent,
    RegisterPageComponent,
    LoadingComponent,
    CheckoutPageComponent,
    OrderItemsListComponent,
    MapComponent,
    PaymentPageComponent,
    ProfilePageComponent,
    MyOrdersPageComponent,
    ContactUsPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GoogleMapsModule,
    ToastrModule.forRoot(),
    TableModule,
    TagModule,
    RatingModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        apiErrorHandlerInterceptor,
        getDataAPIInterceptor,
        postDataAPIInterceptor,
      ])
    ),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
