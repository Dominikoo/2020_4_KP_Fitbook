import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialGroupService } from 'src/app/services/social.group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-group-popup',
  templateUrl: './add-group-popup.component.html',
  styleUrls: ['./add-group-popup.component.scss']
})
export class AddGroupPopupComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  })

  public onClose: Subject<boolean>;

  socialGroup = {
    name: '',
    description: '',
    owner: undefined
  }

  constructor(
    public bsModalRef: BsModalRef,
    private localeService: BsLocaleService,
    private router: Router,
    private socialGroupService: SocialGroupService,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.localeService.use('pl');
    this.userService.getByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.socialGroup.owner = response;
    });
    this.onClose = new Subject();
  }

  onConfirm() {
    this.socialGroup.name = this.form.controls.name.value;
    this.socialGroup.description = this.form.controls.description.value;
    this.socialGroupService.postSocialGroup(this.socialGroup).subscribe(
      response => {
        this.onClose.next(true);
        this.bsModalRef.hide();
      });
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
