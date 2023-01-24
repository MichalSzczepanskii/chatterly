import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FrontendShellRoutingModules } from './frontend-shell-routing.modules';
import { FrontendSharedDataAccessModule } from '@chatterly/frontend/shared/data-access';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    BrowserModule,
    FrontendShellRoutingModules,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    FrontendSharedDataAccessModule,
  ],
})
export class FrontendShellModule {}
