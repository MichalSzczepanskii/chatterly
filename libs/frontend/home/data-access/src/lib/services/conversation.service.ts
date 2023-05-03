import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Conversation } from '@chatterly/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class ConversationService {
  readonly apiUrl = process.env['NX_API_URL'];

  constructor(private http: HttpClient) {}

  getPrivateConversation(userId: number) {
    return this.http.get<Conversation>(
      `${this.apiUrl}/api/conversations/user/${userId}`
    );
  }

  sendPrivateMessage(userId: number, text: string) {
    return this.http.post(`${this.apiUrl}/api/conversations/user/${userId}`, {
      message: text,
    });
  }
}
