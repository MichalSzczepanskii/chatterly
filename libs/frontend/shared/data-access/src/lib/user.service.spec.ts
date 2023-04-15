import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('UserService', () => {
  const apiUrl = process.env['NX_API_URL'];
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getProfileImage()', () => {
    it('should make get request with filename as url param', () => {
      const fileName = 'testImage.png';
      service.getProfileImage(fileName).subscribe();
      const req = httpTestingController.expectOne(
        `${apiUrl}/api/users/profile-image/${fileName}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(null);
    });
  });
});
