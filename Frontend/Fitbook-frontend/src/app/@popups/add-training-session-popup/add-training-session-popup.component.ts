import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-training-session-popup',
  templateUrl: './add-training-session-popup.component.html',
  styleUrls: ['./add-training-session-popup.component.scss']
})
export class AddTrainingSessionPopupComponent implements OnInit {
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
  }

  reserve() {
    
  }
}
