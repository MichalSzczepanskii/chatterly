import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { frontendHomeFeatureHomeRoutes } from './lib.routes';
import { FrontendHomeFeatureHomeComponent } from './frontend-home-feature-home.component';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(frontendHomeFeatureHomeRoutes)],
  declarations: [FrontendHomeFeatureHomeComponent],
})
export class FrontendHomeFeatureHomeModule {}
