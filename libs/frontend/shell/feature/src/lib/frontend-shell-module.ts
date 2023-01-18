import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FrontendShellRoutingModules } from './frontend-shell-routing.modules';

@NgModule({
  imports: [BrowserModule, FrontendShellRoutingModules],
})
export class FrontendShellModule {}
