import { UserService } from './../../../services/user.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-sidebar',
  templateUrl: './login-sidebar.component.html',
  styleUrls: ['./login-sidebar.component.scss']
})
export class LoginSidebarComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  processing = false;

  invalidLoginData = false;

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  signIn(): void {
    if(this.form.controls.login.value != '' && this.form.controls.password.value != ''){
      this.processing = true;
      this.authService.logInUser(this.form.getRawValue()).subscribe(
        response => {
          this.processing = false;
          if(response != ''){
            localStorage.setItem('token', response)
            localStorage.setItem('userLogin', this.form.controls.login.value)
            this.userService.isUserAdmin(this.form.controls.login.value).subscribe(response =>{
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
