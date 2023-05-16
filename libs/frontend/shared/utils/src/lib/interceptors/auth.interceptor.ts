import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, of, switchMap, take } from 'rxjs';
import {
  AuthState,
  logout,
  selectToken,
} from '@chatterly/frontend/shared/data-access';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authStore: Store<AuthState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authStore.select(selectToken).pipe(
      take(1),
      switchMap(token => {
        if (token) {
          const clonedRequest = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${token}`),
          });
          return next.handle(clonedRequest).pipe(
            catchError(err => {
              if (err.status === 401) this.authStore.dispatch(logout());
              return of(err);
            })
          );
        } else return next.handle(request);
      })
    );
  }
}
