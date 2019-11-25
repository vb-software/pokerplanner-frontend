import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { of } from 'rxjs';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('should return token on login', () => {
    const service: AuthService = TestBed.get(AuthService);
    const loginResponse = {
      result: {
        tokenString: ''
      }
    };
    let response;
    spyOn(service, 'login').and.returnValue(of(loginResponse));

    service.login({username: 'some-user', password: 'password'}).subscribe(res => {
      response = res;
    });

    expect(response).toEqual(loginResponse);
  });

});
