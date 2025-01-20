import { Injectable } from '@angular/core';
import { Cart } from '../../models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../../models/Food';
import { CartItem } from '../../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(
    this.cart
  ); //Giving initial value as cart.
  constructor() {}

  addToCart(food: Food) {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) {
      return;
    } else {
      this.cart.items.push(new CartItem(food));
    }
    this.setCartToLocalStorage();
  }

  removeFromCart(foodId: string) {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCartToLocalStorage();
  }

  changQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === foodId);
    if (!cartItem) {
      return;
    } else {
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.food.price;
    }
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  getCartObservable(): Observable<Cart> {
    //Send as observable because if send as Subject able to change in cartSubject outside the cartservice.
    return this.cartSubject.asObservable();
  }

  private setCartToLocalStorage() {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevCount, currentItem) => prevCount + currentItem.quantity,
      0
    );
    const cartToJson = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartToJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartToJson = localStorage.getItem('cart');
    return cartToJson ? JSON.parse(cartToJson) : new Cart();
  }
}
