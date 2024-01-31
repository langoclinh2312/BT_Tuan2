// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const requiredRoles = next.data['roles'] as string[];

    if (!requiredRoles || requiredRoles.length === 0) {
      // No roles specified, allow access
      return false;
    }

    return this.checkAccess(requiredRoles, state.url);
  }

  private checkAccess(requiredRoles: string[], url: string): boolean | UrlTree {
    const userRoles = this.authService.getRole();
    if (userRoles == undefined) {
      return this.router.createUrlTree(['/login']);
    }
    if (this.authService.isAuthenticatedUser()) {
      // Check if the user has any of the required roles
      const trimmedUserRoles = userRoles.trim().replace(/"/g, '');
      const hasRequiredRole = requiredRoles.some(role => trimmedUserRoles === role.trim());
      if (hasRequiredRole) {
        return true; // User has the required role, allow access
      } else {
        // User does not have the required role, navigate to an error page
        window.alert('You do not have the required role to access this page.');
        return false;
      }
    } else {
      // User is not authenticated, redirect to login and store the intended URL
      window.alert('You do not have the required role to access this page.');
      return this.router.createUrlTree(['/login']);
    }
  }
}
