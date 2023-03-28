import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from './alert.service';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { TranslocoService } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, MessageModule],
  providers: [AlertService, MessageService, TranslocoService],
})
export class FrontendSharedServicesAlertModule {}
