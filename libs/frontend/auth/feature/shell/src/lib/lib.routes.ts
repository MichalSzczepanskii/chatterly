import { Route } from '@angular/router';

export const authShellRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: async () =>
      (await import('@chatterly/frontend/auth/feature/login')).AuthLoginModule,
  },
  {
    path: 'register',
    loadChildren: async () =>
      (await import('@chatterly/frontend/auth/feature/register'))
        .AuthRegisterModule,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
