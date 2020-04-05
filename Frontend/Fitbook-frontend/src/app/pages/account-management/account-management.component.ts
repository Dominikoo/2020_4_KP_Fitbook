import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  newUser = {
    email: '',
    login: '',
    password: ''
  }

  isLoginUsed = false;
  isEmailUsed = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}
