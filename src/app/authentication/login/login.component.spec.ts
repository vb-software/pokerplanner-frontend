import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../_services/auth.service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<LoginComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  const loginResponse = {
    result: {
      tokenString: 'token'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [LoginComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        ToastrModule.forRoot({
          timeOut: 10000,
          positionClass: 'toast-bottom-right'
        })
      ],
      providers: [
        AuthService,
        { provide: Router, useValue: router }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    localStorage.removeItem('access-token');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogin and return token', () => {
    const buttonEle: HTMLElement = fixture.nativeElement.querySelector('.login_btn');
    spyOn(authService, 'login').and.returnValue(of<any>(loginResponse));
    spyOn(component, 'onLogin').and.callThrough();
    buttonEle.click();

    expect(component.onLogin).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith(component.login);
    expect(router.navigate).toHaveBeenCalledWith(['/admin']);
    const tokenInBrowser = localStorage.getItem('access_token');
    expect(tokenInBrowser).toBe(loginResponse.result.tokenString);
  });

  it('should call onLogin and return error', () => {
    const buttonEle: HTMLElement = fixture.nativeElement.querySelector('.login_btn');
    spyOn(authService, 'login').and.returnValue(throwError({ status: 401 }));
    spyOn(component, 'onLogin').and.callThrough();
    buttonEle.click();

    expect(component.onLogin).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith(component.login);
  });
});
