import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@chatterly/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  readonly apiUrl = process.env['NX_API_URL'];
  constructor(private http: HttpClient) {}

  searchByName(name: string): Observable<User[]> {
    return this.http.get<User[]>(
      `${this.apiUrl}/api/users/search/name/${name}`
    );
  }
}
