import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-delete-popup',
  templateUrl: './confirm-delete-popup.component.html',
  styleUrls: ['./confirm-delete-popup.component.scss']
})
export class ConfirmDeletePopupComponent implements OnInit {

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
