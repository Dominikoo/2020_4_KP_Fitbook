import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-training-plan-popup',
  templateUrl: './add-training-plan-popup.component.html',
  styleUrls: ['./add-training-plan-popup.component.scss']
})
export class AddTrainingPlanPopupComponent implements OnInit {

  public onClose: Subject<boolean>;

  id: string;
  date: Date = new Date();
  comment = '';

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
    this.onClose.next(true);
    this.bsModalRef.hide()
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
