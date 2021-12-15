import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('/login')) {
      return next.handle(request)
    }
    if (request.url.includes('/signup')) {
      return next.handle(request)
    }
    const token = localStorage.getItem('token');
    if (token) {
      const newRequest = request.clone({
        headers: request.headers.set('Auhorization', `Bearer ${token}`)
      })
      return next.handle(newRequest)
    }
    return next.handle(request);
  }
}
