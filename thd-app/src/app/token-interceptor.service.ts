import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor,HttpHandler,HttpRequest,} from '@angular/common/http';
import { AuthService } from './auth.service';

/**
 * Token interceptor class
 * It is used to include JWT stored in the local storage as authorization header in HTTP requests.
 * IT prevents anyone to bypass tokens in the web browsers
 */
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  /**
   * injecting auth service and injector
   * @param authService 
   * @param injector 
   */
  constructor(private authService: AuthService, private injector: Injector) {}

  /**
   * This function adds authorization header and add the token to it if exists
   */
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authService = this.injector.get(AuthService);
    req = req.clone({
      url: req.url,
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
      },
    });
    return next.handle(req);
  }
}
