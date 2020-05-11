import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss']
})
export class ChangePasswordPopupComponent implements OnInit {

  id: Number;
  password: string;

  form = new FormGroup({
    password: new FormControl('temp'),
    passwordConfirmation: new FormControl('temp')
  });

  public onClose: Subject<boolean>;

  constructor(private userService: UserService,
              private bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
    this.form.controls.password = new FormControl('', [Validators.required, Validators.minLength(6), hasToBeDifferentThan(new FormControl(this.password))]);
    this.form.controls.passwordConfirmation = new FormControl('', [Validators.required, hasToBeEqualTo(this.form.controls.password)]);
  }

  onConfirm() {
    this.userService.put({ id: this.id, password: this.form.controls.password.value }).subscribe(
      response =>{
        if(response == null){
          this.onClose.next(false);        
        } else {
          this.onClose.next(true);
        }
        this.bsModalRef.hide();
      }
    )
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}

export function hasToBeDifferentThan(other: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isDifferent = control.value == other.value;
    return isDifferent ? { 'isDifferent': {value: control.value}} : null;
  };
}

export function hasToBeEqualTo(other: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const isEqual = control.value != other.value;
    return isEqual ? { 'isEqual': {value: control.value}} : null;
  };
}

