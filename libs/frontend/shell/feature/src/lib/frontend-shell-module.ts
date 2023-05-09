import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FrontendShellRoutingModules } from './frontend-shell-routing.modules';
import { FrontendSharedDataAccessModule } from '@chatterly/frontend/shared/data-access';

@NgModule({
  imports: [
    BrowserModule,
    FrontendShellRoutingModules,
    FrontendSharedDataAccessModule,
  ],
})
export class FrontendShellModule {}
