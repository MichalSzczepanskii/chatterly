import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GuestLayoutComponent } from '@chatterly/frontend/shell/ui/layouts/guest-layout';
import { MainLayoutComponent } from '@chatterly/frontend/shell/ui/layouts/main-layout';

const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () => (await import('@chatterly/frontend/auth/feature/shell')).AuthShellModule,
      },
    ],
  },
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FrontendShellRoutingModules {}
