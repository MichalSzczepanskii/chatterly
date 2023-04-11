import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { FrontendSharedDataAccessModule } from '@chatterly/frontend/shared/data-access';

@NgModule({
  imports: [CommonModule, FrontendSharedDataAccessModule],
  providers: [AuthGuard, GuestGuard],
})
export class FrontendSharedUtilsModule {}
