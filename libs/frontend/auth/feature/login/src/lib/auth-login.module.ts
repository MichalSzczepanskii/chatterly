import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './auth-login.component';
import { RouterModule } from '@angular/router';
import { AuthCardComponent } from '@chatterly/frontend/auth/ui/card';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
  ],
  declarations: [AuthLoginComponent],
})
export class AuthLoginModule {}
