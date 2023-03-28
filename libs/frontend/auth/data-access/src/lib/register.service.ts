import { Injectable } from '@angular/core';
import { SignupData } from '@chatterly/shared/data-access';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  readonly apiUrl = process.env['NX_API_URL'];
  constructor(private httpClient: HttpClient) {}

  isEmailTaken(email: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.apiUrl}/api/users/email`, {
      email,
    });
  }

  register(data: SignupData): Observable<number> {
    return this.httpClient.post<number>(`${this.apiUrl}/api/users`, data);
  }
}
