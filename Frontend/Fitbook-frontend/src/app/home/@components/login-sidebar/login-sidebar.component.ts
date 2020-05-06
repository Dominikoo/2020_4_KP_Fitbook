import { UserService } from './../../../services/user.service';
import { AuthService } from './../../../services/auth.service';
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

  processing = false;

  invalidLoginData = false;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn(): void {
    if(this.loginData.login != '' && this.loginData.password != ''){
      this.processing = true;
      this.authService.logInUser(this.loginData).subscribe(
        response => {
          this.processing = false;
          if(response != ''){
            localStorage.setItem('token', response)
            localStorage.setItem('userLogin', this.loginData.login)
            this.userService.isUserAdmin(this.loginData.login).subscribe(response =>{
              localStorage.setItem('isAdmin', response)
              console.log(localStorage.getItem('isAdmin'))
              this.router.navigate(['/pages']);
            })
          }
          else{
            this.invalidLoginData = true;
          }
        })
    }
    else{
      this.invalidLoginData = true;
    }

  }

  signUp(): void {
    this.router.navigate(['register']);
  }

}
