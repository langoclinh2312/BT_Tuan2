// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from './cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  totalQuantity: number = 0; // Declare totalQuantity
  private totalQuantitySubscription: Subscription = new Subscription();


  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService // Inject CartService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    // Get total quantity from the cart service
    this.totalQuantitySubscription = this.cartService.totalQuantity$.subscribe(
      (totalQuantity) => {
        this.totalQuantity = totalQuantity;
      }
    );

    if (this.isLoggedIn()) {
      this.router.navigate(['/books']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    // Ensure to unsubscribe from the subscription when the component is destroyed
    this.totalQuantitySubscription.unsubscribe();
  }
}
  