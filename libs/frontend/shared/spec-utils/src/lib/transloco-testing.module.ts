import {
  TranslocoTestingModule,
  TranslocoTestingOptions,
} from '@ngneat/transloco';
import { en, pl } from '@chatterly/frontend/shared/assets';

export function getTranslocoModule(options: TranslocoTestingOptions = {}) {
  return TranslocoTestingModule.forRoot({
    langs: { en, pl },
    translocoConfig: {
      availableLangs: ['en', 'pl'],
      defaultLang: 'en',
    },
    preloadLangs: true,
    ...options,
  });
}
