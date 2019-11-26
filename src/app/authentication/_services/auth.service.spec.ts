import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

describe('AuthService', () => {
  let httpMock: HttpTestingController;
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    expect(service).toBeTruthy();
  });

  it('should return token on login', () => {
    const service: AuthService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    const loginResponse = {
      result: {
        tokenString: ''
      }
    };

    service
      .login({ username: 'some-user', password: 'password' })
      .subscribe(res => {
        expect(res).toEqual(loginResponse);
      });

    const req = httpMock.expectOne(
      `${environment.apiUrl}/auth/login`,
      'call to api'
    );
    expect(req.request.method).toBe('POST');

    req.flush(loginResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
