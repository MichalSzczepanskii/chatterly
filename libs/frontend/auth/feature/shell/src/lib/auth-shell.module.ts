import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { authShellRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(authShellRoutes)],
})
export class AuthShellModule {}
