import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly apiUrl = process.env['NX_API_URL'];
  constructor(private httpClient: HttpClient) {}

  getProfileImage(fileName: string): Observable<Blob> {
    const extension = fileName.split('.')[1];
    return this.httpClient.get(
      `${this.apiUrl}/api/users/profile-image/${fileName}`,
      { responseType: 'blob' }
    );
  }
}
