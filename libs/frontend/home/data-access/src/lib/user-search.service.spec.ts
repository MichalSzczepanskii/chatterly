import { TestBed } from '@angular/core/testing';

import { UserSearchService } from './user-search.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { User } from '@chatterly/shared/data-access';
import { UserFactory } from '../../../../shared/spec-utils/src/lib/factories/user-factory';

describe('UserSearchService', () => {
  const apiUrl = process.env['NX_API_URL'];
  let service: UserSearchService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserSearchService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#searchByName', () => {
    it('should make a get request', () => {
      const testData: User[] = UserFactory.createMany(5);
      const keyword = 'test';
      service
        .searchByName(keyword)
        .subscribe(result => expect(result).toEqual(testData));
      const req = httpTestingController.expectOne(
        `${apiUrl}/api/users/search/name/${keyword}`
      );
      expect(req.request.method).toEqual('GET');
      req.flush(testData);
      httpTestingController.verify();
    });
  });
});
