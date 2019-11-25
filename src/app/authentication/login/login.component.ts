import { Component, OnInit } from '@angular/core';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../_services/auth.service';
import { Login } from '../_models/login';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faKey = faKey;
  faUser = faUser;

  login: Login = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private toast: ToastrService, private router: Router) { }

  ngOnInit() {
  }

  onLogin() {
    console.log('Component login called');
    this.authService.login(this.login).subscribe(
      x => {
        localStorage.setItem('access_token', x.result.tokenString);
        this.authService.broadcastLoggedIn(true);
        this.toast.success('User logged in successfully!');

        // if (this.rememberMeChecked) {
        //   localStorage.setItem('rememberMe', this.login.username);
        // } else {
        //   localStorage.removeItem('rememberMe');
        // }

        this.router.navigate(['/admin']);
      },
      err => {
        if (err.status === 401) {
          this.toast.error('Username and/or password is incorrect.');
        }
      }
    );
  }

}
