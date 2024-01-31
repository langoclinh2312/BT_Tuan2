// auth.service.ts
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey: string ='tokenKey';
  private rolesKey: string = 'rolesKey';
  private apiUrl: string = 'http://localhost:3000/admins';
  redirectUrl: string = '';

  constructor(private http: HttpClient) {}
  authenticate(username: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(u => u.username === username && u.password === password)),
      tap(user => {
        if (user) {
          // If user is found, save token and roles to local storage
          this.saveToken(user.id);
          this.saveRoles(user.roles);
        } else {
          // If user is not found, simulate invalid credentials
          throw new Error('Invalid username or password');
        }
      }),
      catchError(error => {
        let errorMessage = 'Authentication failed';
        if (error instanceof Error) {
          errorMessage = error.message;
        } else if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }

  getCurrentUser(): Observable<any> {
    // Make a GET request to get the current user's information
    return this.http.get<any>(`${this.apiUrl}/profile`);
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  saveRoles(roles: string): void {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticatedUser(): boolean {
    return !!this.getToken();
  }

  getRole(): string {
    const rolesString = localStorage.getItem(this.rolesKey);
    return rolesString ? JSON.parse(rolesString) : undefined;
  }

  isLoggedIn(): boolean {
    // Add any additional logic if needed
    const additionalLogicResult = this.checkAdditionalLogic();
    // Check if the user is authenticated and the additional logic passes
    return this.isAuthenticatedUser() && additionalLogicResult;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.rolesKey);
  }

  private checkAdditionalLogic(): boolean {
    // Implement your additional logic here
    const userRole = this.getRole();
    
    // Example: Check if the user has either 'admin' or 'user' role
    return userRole === 'admin' || userRole === 'user';
  }
  
}
