import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Auth Guard class
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  /**
   * a constructor to create new instance of this class
   * @param authService : inject authService for the loggin method
   * @param router : inject the router service to control navigation
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * this function returns true if the user is logged in otherwise it redirects the user to the login page
   */
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
