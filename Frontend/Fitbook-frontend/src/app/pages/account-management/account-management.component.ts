import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AuthManager } from 'src/app/auth/auth.manager';
import { Form, FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {


  userInfo = {
    email: '',
    login: '',
    password: '',
    firstName: '',
    lastName: '',
    nickname: ''
  }

  isLoginUsed = false;
  isEmailUsed = false;

  constructor(private userService: UserService, private authManager:AuthManager) {
    
    this.userService.getByLogin(this.authManager.getLogin()).subscribe(
      response => {
        this.userInfo = response;
      }
    )

   }

  ngOnInit(): void { }

  // signIn(): void {
  //   if(this.loginData.login != '' && this.loginData.password != ''){
  //     this.authService.logInUser(this.loginData).subscribe(
  //       response => {
  //         if(response != ''){
  //           this.authManager.setToken(response);
  //           this.authManager.setLogin(this.loginData.login)
  //           this.router.navigate(['/pages']);
  //         }
  //         else{
  //           this.invalidLoginData = true;
  //         }
  //       })
  //   }
  //   else{
  //     this.invalidLoginData = true;
  //   }

  // }

  // logInUser(user) {
  //   return this.httpClient.post(this.url, user, {responseType: 'text'})
  // }

}
