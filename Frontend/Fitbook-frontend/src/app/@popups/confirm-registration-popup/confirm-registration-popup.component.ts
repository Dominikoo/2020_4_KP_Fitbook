import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-registration-popup',
  templateUrl: './confirm-registration-popup.component.html',
  styleUrls: ['./confirm-registration-popup.component.scss']
})
export class ConfirmRegistrationPopupComponent implements OnInit {

  public onClose: Subject<boolean>;

  constructor( public bsModalRef: BsModalRef, private router: Router) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  onConfirm() {
    this.router.navigate(['/about']);
    this.bsModalRef.hide();
  }

  onCancel() {
    this.router.navigate(['/about']);
    this.bsModalRef.hide();
  }

}
