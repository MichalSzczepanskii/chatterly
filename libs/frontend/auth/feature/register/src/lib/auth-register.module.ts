import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRegisterComponent } from './auth-register.component';
import { RouterModule } from '@angular/router';
import { AuthCardComponent } from '@chatterly/frontend/auth/ui/card';
import { TranslocoModule } from '@ngneat/transloco';
import { ReactiveFormsModule } from '@angular/forms';
import { FrontendControlErrorsComponent } from '@chatterly/frontend/shared/ui/control-errors';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthRegisterComponent,
      },
    ]),
    AuthCardComponent,
    TranslocoModule,
    ReactiveFormsModule,
    FrontendControlErrorsComponent,
  ],
  declarations: [AuthRegisterComponent],
})
export class AuthRegisterModule {}
