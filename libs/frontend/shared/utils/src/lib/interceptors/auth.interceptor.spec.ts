import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MockModule } from 'ng-mocks';
import {
  FrontendSharedDataAccessModule,
  selectToken,
} from '@chatterly/frontend/shared/data-access';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('AuthInterceptor', () => {
  let client: HttpClient;
  let httpController: HttpTestingController;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MockModule(FrontendSharedDataAccessModule),
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
        provideMockStore(),
      ],
    });

    client = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(MockStore);
  });

  it('should add jwt token to headers', () => {
    mockStore.overrideSelector(selectToken, 'test');
    client.get('/test').subscribe();
    const req = httpController.expectOne('/test');
    req.flush(null);
    const bearerHeader = req.request.headers.get('Authorization');
    expect(bearerHeader).toEqual('Bearer test');
  });

  it('should pass request if no jwt token is present', () => {
    mockStore.overrideSelector(selectToken, null);
    client.get('/test').subscribe();
    const req = httpController.expectOne('/test');
    req.flush(null);
    const bearerHeader = req.request.headers.get('Authorization');
    expect(bearerHeader).toBeNull();
  });
});
