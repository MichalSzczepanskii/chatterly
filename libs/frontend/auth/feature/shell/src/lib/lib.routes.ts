import { Route } from '@angular/router';

export const authShellRoutes: Route[] = [
  {
    path: 'login',
    loadChildren: async () => (await import('@chatterly/frontend/auth/feature/login')).AuthLoginModule,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
