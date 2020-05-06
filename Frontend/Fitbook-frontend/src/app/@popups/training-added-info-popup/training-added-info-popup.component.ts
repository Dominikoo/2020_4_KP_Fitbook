import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-training-added-info-popup',
  templateUrl: './training-added-info-popup.component.html',
  styleUrls: ['./training-added-info-popup.component.scss']
})
export class TrainingAddedInfoPopupComponent implements OnInit {

  public onClose: Subject<boolean>;

  constructor( public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  onConfirm() {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
