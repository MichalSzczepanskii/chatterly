import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(
    private messageService: MessageService,
    private translocoService: TranslocoService
  ) {}

  showError({ title = 'error.title', message }: AlertMessage): void {
    this.messageService.add({
      severity: 'error',
      summary: this.translocoService.translate(title),
      detail: this.translocoService.translate(message),
    });
  }

  showSuccess({ title = 'success.title', message }: AlertMessage): void {
    this.messageService.add({
      severity: 'success',
      summary: this.translocoService.translate(title),
      detail: this.translocoService.translate(message),
    });
  }
}

export interface AlertMessage {
  title?: string;
  message: string;
}
