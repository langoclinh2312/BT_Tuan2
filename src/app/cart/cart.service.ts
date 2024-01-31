// cart.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../books/share/models/book';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Book[] = [];
  private cartItemsSubject = new BehaviorSubject<Book[]>([]);
  private totalQuantitySubject = new BehaviorSubject<number>(0);
  totalQuantity$ = this.totalQuantitySubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
    this.updateTotalQuantity();
  }

  getCartItemsSubject(): BehaviorSubject<Book[]> {
    return this.cartItemsSubject;
  }

  getCartItems() {
    return this.cartItemsSubject.asObservable();
  }

  addToCart(book: Book): void {
    const existingItem = this.cartItems.find((item) => item.title === book.title);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newCartItem: Book = { ...book, quantity: 1 };
      this.cartItems.push(newCartItem);
    }

    this.cartItemsSubject.next(this.cartItems);
    this.saveToLocalStorage();
    this.updateTotalQuantity();
  }

  updateCartItemQuantity(index: number, newQuantity: number): void {
    if (index >= 0 && index < this.cartItems.length && newQuantity >= 1) {
      this.cartItems[index].quantity = newQuantity;
      this.cartItemsSubject.next(this.cartItems);
      this.saveToLocalStorage();
      this.updateTotalQuantity();
    }
  }

  removeCartItem(index: number): void {
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.cartItemsSubject.next(this.cartItems);
      this.saveToLocalStorage();
      this.updateTotalQuantity();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  private loadFromLocalStorage() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
      this.cartItemsSubject.next(this.cartItems);
    } else {
      this.cartItemsSubject.next(this.cartItems);
    }
  }
  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  updateTotalQuantity() {
    const totalQuantity = this.getTotalQuantity();
    this.totalQuantitySubject.next(totalQuantity);
  }
  clearCart(): void {
    this.cartItems = []; // Clear the cartItems array
    this.cartItemsSubject.next(this.cartItems); // Update the cartItemsSubject
    this.saveToLocalStorage(); // Save changes to local storage
    this.updateTotalQuantity(); // Update the total quantity
  }
}
