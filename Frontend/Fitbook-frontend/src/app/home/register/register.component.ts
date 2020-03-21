import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUser = {
    email: '',
    login: '',
    password: ''
  }
  constructor(private userService: UserService) { }

  signUp(): void {
    this.userService.post(this.newUser).subscribe(
      Response => {}
    )
  }

  ngOnInit(): void {
  }

}
