// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthUtils } from './shared/utils/auth-ultis';


@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (AuthUtils.isAuthenticated() && AuthUtils.isAdmin()) {
      return true; // Nếu người dùng đã đăng nhập và là admin, cho phép truy cập route
    } else {
      // Nếu chưa đăng nhập hoặc không phải là admin, chuyển hướng đến trang đăng nhập
      this.router.navigate(['/login']);
      return false;
    }
  }
}
