import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as dayjs from 'dayjs';
import { AuthStorageKeys } from '@chatterly/frontend/shared/constants';

describe('AuthService', () => {
  const apiUrl = process.env['NX_API_URL'];
  let httpTestingController: HttpTestingController;
  let service: AuthService;
  let store = {};
  const mockLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
  Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });
  jest.spyOn(global.localStorage, 'removeItem');
  const mockToken = {
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imd1ZXN0QGxvY2FsaG9zdCIsInN1YiI6MiwiaWF0IjoxNjc0MjEzNDM5LCJleHAiOjE2NzQyMTcwMzl9.6s-v2yPht59pZUrjKlsI3sygWpVfJbAabhwtWdaj3uM',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    window.localStorage.clear();
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

    it('should set access token in localStorage', () => {
      const loginMethod = service.login({ email: 'test@gmail.com', password: 'root12' });
      loginMethod.subscribe();
      const req = httpTestingController.expectOne(`${apiUrl}/api/auth/login`);
      req.flush(mockToken);
      expect(localStorage.getItem(AuthStorageKeys.ACCESS_TOKEN)).toEqual(mockToken.access_token);
      expect(localStorage.getItem(AuthStorageKeys.EXPIRES_AT)).toEqual('2023-01-20T12:17:19.000Z');
    });
  });

  describe('#logout()', () => {
    it('should clear local storage items', () => {
      service.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith(AuthStorageKeys.ACCESS_TOKEN);
      expect(localStorage.removeItem).toHaveBeenCalledWith(AuthStorageKeys.EXPIRES_AT);
    });
  });

  describe('#isLoggedIn()', () => {
    it('should return false if expires_at from local storage value is empty', () => {
      expect(service.isLoggedIn()).toEqual(false);
    });

    it('should return true if token did not expire', () => {
      localStorage.setItem(AuthStorageKeys.ACCESS_TOKEN, 'test');
      localStorage.setItem(AuthStorageKeys.EXPIRES_AT, dayjs().add(7, 'days').toISOString());
      expect(service.isLoggedIn()).toEqual(true);
    });

    it('should return false if token expired', () => {
      localStorage.setItem(AuthStorageKeys.ACCESS_TOKEN, 'test');
      localStorage.setItem(AuthStorageKeys.EXPIRES_AT, dayjs().subtract(7, 'days').toISOString());
      expect(service.isLoggedIn()).toEqual(false);
    });

    it('should return false if access token is undefined but expires at is valid', () => {
      localStorage.setItem(AuthStorageKeys.EXPIRES_AT, dayjs().add(7, 'days').toISOString());
      expect(service.isLoggedIn()).toEqual(false);
    });

    it('should return false if access token is undefined and token expired', () => {
      localStorage.setItem(AuthStorageKeys.EXPIRES_AT, dayjs().subtract(7, 'days').toISOString());
      expect(service.isLoggedIn()).toEqual(false);
    });
  });
});
