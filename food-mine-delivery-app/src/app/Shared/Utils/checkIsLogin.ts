import { jwtDecode } from 'jwt-decode';
import { localStorageUserToken } from '../constants/UserConstants';
import { Injectable } from '@angular/core';
import { AlertService } from '../Services/alert.service';

@Injectable({
  providedIn: 'root', // Ensures it's available throughout the app
})
export class checkIsLogin {
  constructor(private alertService: AlertService) {}
  isLoggedIn(): boolean {
    const token = localStorage.getItem(localStorageUserToken);
    if (token) {
      const parsedToken = JSON.parse(token);
      const decodedToken: any = jwtDecode(parsedToken);
      if (decodedToken && decodedToken.exp) {
        if (decodedToken.exp > Math.floor(Date.now() / 1000)) {
          // Checking for current time by Math.floor(Date.now() / 1000)
          if (decodedToken.isDeliveryBoy && decodedToken.isAuthenticated) {
            return true;
          } else {
            if (!decodedToken.isAuthenticated) {
              this.alertService.warningAlert(
                'You are not authenticated.Please contact Admin'
              );
            }
            console.log('You are not authenticated.');
          }
        } else {
          console.log('Token Expired');
        }
      }
    }
    return false;
  }
}
