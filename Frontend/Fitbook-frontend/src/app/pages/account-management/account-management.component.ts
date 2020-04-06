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

  isSaveSuccesful = true
  showLog = false

  constructor(private userService: UserService, private authManager:AuthManager) {
    
    this.userService.getByLogin(this.authManager.getLogin()).subscribe(
      response => {
        this.userInfo = response;
      }
    )

   }

  ngOnInit(): void { }

  saveChanges(): void {
      this.userService.post(this.userInfo).subscribe(
        response =>{
          if(response == null){
            this.isSaveSuccesful = false;
          };
          this.showLog = true;
        }
      )
  }
}
