import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as dayjs from 'dayjs';
import { AuthLoginResponse } from '@chatterly/shared/data-access';
import { Store } from '@ngrx/store';
import { AuthState } from './+state/auth/auth.reducer';
import { selectExpiresAt, selectToken } from './+state/auth/auth.selectors';
import { combineLatest, first, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl = process.env['NX_API_URL'];
  constructor(private http: HttpClient, private store: Store<AuthState>) {}

  login(data: { password: string; email: string }) {
    return this.http.post<AuthLoginResponse>(`${this.apiUrl}/api/auth/login`, data);
  }

  isLoggedIn(): Observable<boolean> {
    return combineLatest([
      this.store.select(selectExpiresAt).pipe(first()),
      this.store.select(selectToken).pipe(first()),
    ]).pipe(
      map(([expiresAtText, accessToken]) => {
        if (!expiresAtText || !accessToken) return false;
        return dayjs(expiresAtText).isAfter(dayjs());
      })
    );
  }
}
