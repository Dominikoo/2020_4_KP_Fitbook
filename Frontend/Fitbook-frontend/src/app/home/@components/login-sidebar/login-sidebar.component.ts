import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.scss']
})
export class LoginSidebarComponent implements OnInit {

    loginData = {
      login: '',
      password: ''
    }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  signIn(): void {
    this.router.navigate(['/pages']);
  }

  signUp(): void {
    this.router.navigate(['register']);
  }

}
