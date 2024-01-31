// cart.component.ts

import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Book } from '../books/share/models/book';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Book[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItemsSubject().subscribe((cartItems) => {
      this.cartItems = cartItems;
    });

    // If cart is still empty, try explicitly fetching from the service
    if (this.cartItems.length === 0) {
      this.cartService.getCartItems(); // Assuming you have a method like this in your service
    }
  }

  updateQuantity(index: number, newQuantity: number): void {
    if (newQuantity >= 1) {
      this.cartService.updateCartItemQuantity(index, newQuantity);
    } else {
      // If the new quantity is zero or negative, you may want to remove the item from the cart
      this.cartService.removeCartItem(index);
    }
  }

  removeCartItem(index: number): void {
    this.cartService.removeCartItem(index);
  }

  clearCart(): void {
    this.cartService.clearCart(); // Assuming you have a method like this in your service
  }

  calculateTotal(): number {
    let total = 0;

    if (this.cartItems) {
      this.cartItems.forEach((item) => {
        total += item.price * item.quantity;
      });
    }

    return total;
  }
}
