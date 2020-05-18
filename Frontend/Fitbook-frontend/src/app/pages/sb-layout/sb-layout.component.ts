import { Component, OnInit } from '@angular/core';
import { UserConnectionService } from 'src/app/services/user.connection.service';

@Component({
  selector: 'app-sb-layout',
  templateUrl: './sb-layout.component.html',
  styleUrls: ['./sb-layout.component.scss']
})
export class SbLayoutComponent implements OnInit {

  friendsList: Array<any> = undefined;

  constructor(private userConnectionService: UserConnectionService) { }

  ngOnInit(): void {
    this.userConnectionService.getFriendsByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.friendsList = response;
      console.log(this.friendsList);
    });
  }

}
