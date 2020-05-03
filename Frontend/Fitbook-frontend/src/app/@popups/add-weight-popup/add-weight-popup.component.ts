import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserWeightHistoryService } from './../../services/user.weight.history.service';

@Component({
  selector: 'app-add-weight-popup',
  templateUrl: './add-weight-popup.component.html',
  styleUrls: ['./add-weight-popup.component.scss']
})
export class AddWeightPopupComponent implements OnInit {

  public onClose: Subject<boolean>;

  user_weight = {
    date: Date,
    weight: 0
  }

  constructor( public bsModalRef: BsModalRef, private userWeightHistoryService: UserWeightHistoryService) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  onConfirm() {
    this.userWeightHistoryService.post(this.user_weight, localStorage.getItem('userLogin')).subscribe(respone =>{
      this.onClose.next(true);
      this.bsModalRef.hide()
    })
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
