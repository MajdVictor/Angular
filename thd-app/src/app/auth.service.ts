import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/**
 * AuthService class which handles all authentication operations
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  /**
   * register url for register end point api in the backend server
   */
  private registrationUrl = 'http://localhost:5000/api/register';

  /**
   * login url for login end point api in the backend server
   */
  private loginUrl = 'http://localhost:5000/api/login';

  /**
   * a Constructor to create new instance of this class
   * @param http  : HttpClient module injected in the constructor which allows to use HTTP protocols
   * @param router: used in functions below to redirect the user to different routes
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * method that accepts a user object and returns the response from the backend server
   */
  registerNewUser(user) {
    /**
     * post http request to register api
     */
    return this.http.post<any>(this.registrationUrl, user);
  }

  /**
   *
   * make a call to the backend api "login"
   */
  loginUser(user) {
    return this.http.post<any>(this.loginUrl, user);
  }

  /**
   * if token is stored in the browser it will return true otherwise it returns false
   */
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  /**
   * this function is called when the user logs out and it removes the token from the loal storage
   */
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['home']); //redirecting the user to the home page
  }

  /**
   * this function returns the token stored in the local storage
   */
  getToken() {
    return localStorage.getItem('token');
  }
}
