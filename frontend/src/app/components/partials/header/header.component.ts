import { Component } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../models/User';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  cartQuantity: number = 0;
  user!: User;
  constructor(
    private cartService: CartService,
    private userService: UserService,
    private alertService: AlertService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });

    this.userService.userObservable.subscribe({
      next: (user) => {
        console.log(user);
        this.user = user;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  logout() {
    let isLogout: boolean = false;
    this.alertService.confirmationAlert('Are you sure to logout');
    this.alertService.logoutConfirmationObservable.subscribe({
      next: (islogout: boolean) => {
        console.log('isLogout:' + islogout);
        this.confirmLogout(islogout);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  confirmLogout(isLogout = false) {
    if (isLogout) this.userService.logout();
  }
}
