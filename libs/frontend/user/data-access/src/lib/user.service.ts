import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@chatterly/shared/data-access';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiUrl = process.env['NX_API_URL'];
  constructor(private http: HttpClient) {}

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }
}
