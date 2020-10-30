import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._authService.isAuth) {
      const newReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._authService.getAuthToken()}`
        }
      });
      return next.handle(newReq);
    } else {
      return next.handle(request);
    }
  }
}
