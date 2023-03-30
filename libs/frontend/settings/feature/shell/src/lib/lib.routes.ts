import { Route } from '@angular/router';

export const frontendSettingsFeatureShellRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: async () =>
      (await import('@chatterly/frontend/settings/ui/layout'))
        .FrontendSettingsUiLayoutComponent,
    children: [
      {
        path: 'account',
        loadComponent: async () =>
          (await import('@chatterly/frontend/settings/feature/account'))
            .FrontendSettingsFeatureAccountComponent,
      },
    ],
  },
];
