import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '@chatterly/shared/data-access';
import { UserFactory } from '@chatterly/frontend/shared/spec-utils';

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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make get request for searchUserById', () => {
    const userId = 15;
    const testData: User = UserFactory.create({ id: userId });

    service.getUserById(userId).subscribe(user => {
      expect(user).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${apiUrl}/users/${userId}`);
    expect(req.request.method).toEqual('GET');
    req.flush(testData);
    httpTestingController.verify();
  });
});
