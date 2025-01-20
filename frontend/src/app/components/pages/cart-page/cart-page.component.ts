import { Component } from '@angular/core';
import { Cart } from '../../../models/Cart';
import { CartService } from '../../../shared/services/cart.service';
import { CartItem } from '../../../models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cart!: Cart;
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cartService.getCartObservable().subscribe({
      next: (cart: Cart) => {
        this.cart = cart;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem: CartItem, quantity: string) {
    const parsedQuantity = parseInt(quantity);
    this.cartService.changQuantity(cartItem.food.id, parsedQuantity);
  }
}
