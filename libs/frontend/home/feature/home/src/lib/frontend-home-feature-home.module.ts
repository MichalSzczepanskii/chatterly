import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { frontendHomeFeatureHomeRoutes } from './lib.routes';
import { FrontendHomeFeatureHomeComponent } from './frontend-home-feature-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FrontendHomeDataAccessModule } from '@chatterly/frontend/home/data-access';

import { LoaderComponent } from '@chatterly/frontend/shared/ui/loader';
import { ContactComponent } from '@chatterly/frontend/home/ui/contact';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontendHomeFeatureHomeRoutes),
    ReactiveFormsModule,
    FrontendHomeDataAccessModule,
    ContactComponent,
    LoaderComponent,
  ],
  declarations: [FrontendHomeFeatureHomeComponent],
})
export class FrontendHomeFeatureHomeModule {}
