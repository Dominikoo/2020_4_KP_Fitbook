import { UserService } from './../../services/user.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmRegistrationPopupComponent} from 'src/app/@popups/confirm-registration-popup/confirm-registration-popup.component'

const V = Validators;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form = new FormGroup({
    login: new FormControl('', [V.required, V.minLength(6), V.maxLength(30)]),
    email: new FormControl('', [V.required, V.email]),
    password: new FormControl('', [V.required, V.minLength(6)]),
  });

  bsModalRef: BsModalRef;

  isLoginUsed = false;
  isEmailUsed = false;

  processing = false;

  constructor(private router: Router, private userService: UserService,
              private modalService: BsModalService) {}

  signUp(): void {
    this.processing = true;
    this.userService.isLoginUsed(this.form.controls.login.value).subscribe(
      response => {
        this.isLoginUsed = response;
        if (!response) {
          this.userService.isEmailUsed(`"` + this.form.controls.email.value + `"`).subscribe(
            response => {
              this.isEmailUsed = response;
              if (!response) {
                this.userService.post(this.form.value).subscribe(
                  response => {
                    if (response != null) {
                      this.bsModalRef = this.modalService.show(ConfirmRegistrationPopupComponent)
                    }
                    else this.processing = false;
                  }
                )
              }
              else this.processing = false;
            }
          )
        }
        else this.processing = false;
      }
    )
  }

  ngOnInit(): void {
  }

}
