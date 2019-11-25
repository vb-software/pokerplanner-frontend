import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login } from '../_models/login';
import { Observable, Subject } from 'rxjs';
import { httpOptions } from 'src/app/_constants/httpOptions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${environment.apiUrl}/auth`;

  public loginStatus = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, login, httpOptions);
  }

  broadcastLoggedIn(status: boolean) {
    return this.loginStatus.next(status);
  }
}
