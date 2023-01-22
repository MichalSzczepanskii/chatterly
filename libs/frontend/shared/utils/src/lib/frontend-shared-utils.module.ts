import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

@NgModule({
  imports: [CommonModule],
  providers: [AuthGuard, GuestGuard],
})
export class FrontendSharedUtilsModule {}
