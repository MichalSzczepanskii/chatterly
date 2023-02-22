import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectExpiresAt, selectToken } from './+state/auth/auth.selectors';

describe('AuthService', () => {
  const apiUrl = process.env['NX_API_URL'];
  let httpTestingController: HttpTestingController;
  let service: AuthService;
  let mockStore: MockStore;
  const mockToken = {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXN0QGxvY2FsaG9zdCIsInN1YiI6MiwiaWF0IjoxNjc0MjEzNDM5LCJleHAiOjE2NzQyMTcwMzl9.6s-v2yPht59pZUrjKlsI3sygWpVfJbAabhwtWdaj3uM',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideMockStore()],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(MockStore);
    localStorage.clear();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#login()', () => {
    it('returned Observable should contain jwt token', () => {
      service.login({ email: 'test@gmail.com', password: 'root12' }).subscribe(token => {
        expect(token).toEqual(mockToken);
      });

      const req = httpTestingController.expectOne(`${apiUrl}/api/auth/login`);
      expect(req.request.method).toEqual('POST');
      req.flush(mockToken);
    });
  });

  describe('#isLoggedIn()', () => {
    it('should return false if expires_at from local storage value is empty', () => {
      service.isLoggedIn().subscribe(isLoggedIn => {
        expect(isLoggedIn).toEqual(false);
      });
    });

    it('should return true if token did not expire', () => {
      mockStore.overrideSelector(selectToken, 'test');
      mockStore.overrideSelector(selectExpiresAt, dayjs().add(7, 'days').toISOString());
      service.isLoggedIn().subscribe(isLoggedIn => {
        expect(isLoggedIn).toEqual(true);
      });
    });

    it('should return false if token expired', () => {
      mockStore.overrideSelector(selectToken, 'test');
      mockStore.overrideSelector(selectExpiresAt, dayjs().subtract(7, 'days').toISOString());
      service.isLoggedIn().subscribe(isLoggedIn => {
        expect(isLoggedIn).toEqual(false);
      });
    });

    it('should return false if access token is undefined but expires at is valid', () => {
      mockStore.overrideSelector(selectToken, null);
      mockStore.overrideSelector(selectExpiresAt, dayjs().add(7, 'days').toISOString());
      service.isLoggedIn().subscribe(isLoggedIn => {
        expect(isLoggedIn).toEqual(false);
      });
    });

    it('should return false if access token is undefined and token expired', () => {
      mockStore.overrideSelector(selectToken, null);
      mockStore.overrideSelector(selectExpiresAt, dayjs().subtract(7, 'days').toISOString());
      service.isLoggedIn().subscribe(isLoggedIn => {
        expect(isLoggedIn).toEqual(false);
      });
    });
  });
});
