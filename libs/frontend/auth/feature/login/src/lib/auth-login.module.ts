import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login.component';
import { RouterModule } from '@angular/router';
import { AuthCardComponent } from '@chatterly/frontend/auth/ui/card';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthLoginComponent,
      },
    ]),
    AuthCardComponent,
    TranslocoModule,
  ],
  declarations: [AuthLoginComponent],
})
export class AuthLoginModule {}
