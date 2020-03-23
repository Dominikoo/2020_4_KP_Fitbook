import { UserService } from './../../../services/user.service';
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

  invalidLoginData = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  signIn(): void {
    if(this.loginData.login != '' && this.loginData.password != ''){
      this.userService.validateUser(this.loginData.login, this.loginData.password).subscribe(
        response => {
          console.log(response);
          if(response){
            this.router.navigate(['/pages']);
          }
          else{
            this.invalidLoginData = true;
            this.loginData.login = '';
            this.loginData.password = '';
          }
        })
    }
    else{
      this.invalidLoginData = true;
      this.loginData.login = '';
      this.loginData.password = '';
    }

  }

  signUp(): void {
    this.router.navigate(['register']);
  }

}
