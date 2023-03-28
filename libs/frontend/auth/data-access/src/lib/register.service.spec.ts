import { TestBed } from '@angular/core/testing';

import { RegisterService } from './register.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignupData } from '@chatterly/shared/data-access';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpTestingController: HttpTestingController;
  const signupData: SignupData = {
    name: 'testUser',
    email: 'testUser@gmail.com',
    password: 'root12',
    passwordConfirmation: 'root12',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RegisterService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#register()', () => {
    it('should send post request with signupData', () => {
      const responseId = 1;
      service.register(signupData).subscribe(response => {
        expect(response).toEqual(responseId);
      });

      const req = httpTestingController.expectOne('http://localhost:3000/api/users');
      expect(req.request.method).toEqual('POST');
      req.flush(responseId);
    });
  });

  describe('#isEmailTaken()', () => {
    it('should send post request with email', () => {
      const emailTakenResponse = false;
      service.isEmailTaken(signupData.email).subscribe(response => {
        expect(response).toEqual(emailTakenResponse);
      });

      const req = httpTestingController.expectOne('http://localhost:3000/api/users/email');
      expect(req.request.method).toEqual('POST');
      req.flush(emailTakenResponse);
    });
  });
});
