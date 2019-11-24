import { Component, OnInit } from '@angular/core';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faKey = faKey;
  faUser = faUser;

  constructor() { }

  ngOnInit() {
  }

}
