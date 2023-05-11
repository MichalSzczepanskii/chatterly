import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('router', routerReducer),
    StoreRouterConnectingModule.forRoot(),
  ],
})
export class FrontendNgrxRoutingDataAccessModule {}
