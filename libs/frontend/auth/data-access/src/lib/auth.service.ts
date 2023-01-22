import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import jwtDecode from 'jwt-decode';
import * as dayjs from 'dayjs';
import { AuthStorageKeys } from '@chatterly/frontend/shared/utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly apiUrl = process.env['NX_API_URL'];
  constructor(private http: HttpClient) {}

  login(data: { password: string; email: string }) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/api/auth/login`, data)
      .pipe(tap(data => this.setSession(data)));
  }

  private setSession(data: LoginResponse) {
    const decodedToken = jwtDecode<{ exp: number }>(data.access_token);
    const expiresAt = dayjs.unix(decodedToken.exp);
    localStorage.setItem(AuthStorageKeys.ACCESS_TOKEN, data.access_token);
    localStorage.setItem(AuthStorageKeys.EXPIRES_AT, expiresAt.toISOString());
  }

  logout() {
    localStorage.removeItem(AuthStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(AuthStorageKeys.EXPIRES_AT);
  }

  isLoggedIn() {
    const expiresAtText = localStorage.getItem(AuthStorageKeys.EXPIRES_AT);
    const accessToken = localStorage.getItem(AuthStorageKeys.ACCESS_TOKEN);
    if (!expiresAtText || !accessToken) return false;
    return dayjs(expiresAtText).isAfter(dayjs());
  }
}

interface LoginResponse {
  access_token: string;
}
