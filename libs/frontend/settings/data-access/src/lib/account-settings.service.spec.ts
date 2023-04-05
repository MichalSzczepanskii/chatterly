import { TestBed } from '@angular/core/testing';

import { AccountSettingsService } from './account-settings.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AccountSettings } from '@chatterly/shared/data-access';

describe('AccountSettingsService', () => {
  let service: AccountSettingsService;
  let httpTestingController: HttpTestingController;
  const mockFile = new File([''], 'testImage.png', { type: 'image/png' });
  const accountsData: AccountSettings = {
    name: 'newName',
    profilePicture: mockFile,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AccountSettingsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#updateSettings()', () => {
    it('should send patch request with accountsData', () => {
      service.updateSettings(accountsData).subscribe();

      const req = httpTestingController.expectOne(
        'http://localhost:3000/api/settings/account'
      );

      expect(req.request.method).toEqual('PATCH');
      req.flush(null);
    });
  });
});
