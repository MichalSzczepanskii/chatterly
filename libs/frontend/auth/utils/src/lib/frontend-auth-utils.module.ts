import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidator } from './validators/email-validator';

@NgModule({
  imports: [CommonModule],
  providers: [EmailValidator],
})
export class FrontendAuthUtilsModule {}
