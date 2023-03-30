import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { frontendSettingsFeatureShellRoutes } from './lib.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontendSettingsFeatureShellRoutes),
  ],
})
export class FrontendSettingsFeatureShellModule {}
