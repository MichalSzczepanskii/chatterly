import { Route } from '@angular/router';

export const authShellRoutes: Route[] = [
  {
    path: '',
    loadChildren: async () => (await import('@chatterly/frontend/auth/feature/login')).AuthLoginModule,
  },
];
