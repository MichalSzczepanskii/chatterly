import { Route } from '@angular/router';
import { FrontendHomeFeatureHomeComponent } from './frontend-home-feature-home.component';

export const frontendHomeFeatureHomeRoutes: Route[] = [
  {
    path: '',
    component: FrontendHomeFeatureHomeComponent,
    children: [
      {
        path: ':type/:id',
        loadComponent: async () =>
          (await import('@chatterly/frontend/home/feature/message'))
            .FrontendHomeFeatureMessageComponent,
      },
    ],
  },
];
