import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Form, FormBuilder, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ChangePasswordPopupComponent } from 'src/app/@popups/change-password-popup/change-password-popup.component';

const V = Validators;

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss']
})
export class AccountManagementComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(''),
    email: new FormControl({value: '', disabled: true}, [V.required, V.maxLength(50)]),
    login: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl('', [V.maxLength(30)]),
    lastName: new FormControl('', [V.maxLength(30)]),
    nickname: new FormControl('', [V.maxLength(50)])
  });

  bsModalRef: BsModalRef;

  isSaveSuccesful = true
  showLog = false

  constructor(private userService: UserService,
              private router: Router,
              private modalService: BsModalService) {

    this.userService.getByLogin(localStorage.getItem('userLogin')).subscribe(
      response => {
        this.form.patchValue(response); // fails silently so if u want to have better console 
                                        // outcome rebuild this to 6 setValue() methods
      }
    )
  }

  ngOnInit(): void { }

  saveChanges(): void {
      this.userService.post(this.form.getRawValue()).subscribe(
        response =>{
          console.log(response);
          if(response == null){
            this.isSaveSuccesful = false;
          };
          this.showLog = true;
        }
      )
  }

  savePassword(): void {}

  openPasswordPopup(): void {
    const initialState = { id: this.form.controls.id.value,
                           password: this.form.controls.password.value };
    this.bsModalRef = this.modalService.show(ChangePasswordPopupComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe(response => {
      console.log("Czy zmiana hasla powiodla sie:", response);
    })

  }
}
