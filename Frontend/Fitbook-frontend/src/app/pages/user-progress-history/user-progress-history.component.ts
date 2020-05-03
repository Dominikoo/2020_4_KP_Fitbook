import { Component, OnInit } from '@angular/core';
import { UserProgressService } from './../../services/user.progress.service';

@Component({
  selector: 'app-user-progress-history',
  templateUrl: './user-progress-history.component.html',
  styleUrls: ['./user-progress-history.component.scss']
})
export class UserProgressHistoryComponent implements OnInit {

  userProgressSummary: any;

  constructor(private userProgressService: UserProgressService) { }

  ngOnInit(): void {
    this.userProgressService.getUserProgressSummary(localStorage.getItem('userLogin')).subscribe(response =>
      this.userProgressSummary = response);
  }

}
