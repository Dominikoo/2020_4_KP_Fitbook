import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  isLoginUsed = false;
  isEmailUsed = false;

  constructor(private router: Router, private userService: UserService) { }

  signUp(): void {
      this.userService.isLoginUsed(this.newUser.login).subscribe(
        response =>{
          this.isLoginUsed = response;
          if(! response){
            this.userService.isEmailUsed(this.newUser.email).subscribe(
              response =>{
                this.isEmailUsed = response;
                if(! response){
                  this.userService.post(this.newUser).subscribe(
                    response =>{
                      if(response != null){
                        this.router.navigate(['/pages']);
                      }
                    }
                  )
                }
              }
            )}
        }
      )
  }

  ngOnInit(): void {
  }

}
