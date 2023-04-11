import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GuestLayoutComponent } from '@chatterly/frontend/shell/ui/layouts/guest-layout';
import { MainLayoutComponent } from '@chatterly/frontend/shell/ui/layouts/main-layout';
import { AuthGuard, GuestGuard } from '@chatterly/frontend/shared/utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    canActivate: [GuestGuard],
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@chatterly/frontend/auth/feature/shell'))
            .AuthShellModule,
      },
    ],
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'settings',
        loadChildren: async () =>
          (await import('@chatterly/frontend/settings/feature/shell'))
            .FrontendSettingsFeatureShellModule,
      },
    ],
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  exports: [RouterModule],
})
export class FrontendShellRoutingModules {}
