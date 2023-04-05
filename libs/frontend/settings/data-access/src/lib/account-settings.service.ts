import { Injectable } from '@angular/core';
import { AccountSettings } from '@chatterly/shared/data-access';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsService {
  readonly apiUrl = process.env['NX_API_URL'];

  constructor(private httpClient: HttpClient) {}

  updateSettings(settings: AccountSettings): Observable<null> {
    return this.httpClient.patch<null>(
      `${this.apiUrl}/api/settings/account`,
      settings
    );
  }
}
