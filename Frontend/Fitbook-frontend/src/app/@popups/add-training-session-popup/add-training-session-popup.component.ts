import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-training-session-popup',
  templateUrl: './add-training-session-popup.component.html',
  styleUrls: ['./add-training-session-popup.component.scss']
})
export class AddTrainingSessionPopupComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  public onClose: Subject<boolean>;

  nazwa: string;

  constructor(
    public bsModalRef: BsModalRef,
    private localeService: BsLocaleService,
    private router: Router
    ) { }

  ngOnInit() {
    this.localeService.use('pl');
    this.onClose = new Subject();
  }

  onConfirm() {
    this.nazwa = this.form.controls.name.value;
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
