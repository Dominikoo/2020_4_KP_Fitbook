import { Component, OnInit } from '@angular/core';
import { UserConnectionService } from 'src/app/services/user.connection.service';

@Component({
  selector: 'app-sb-layout',
  templateUrl: './sb-layout.component.html',
  styleUrls: ['./sb-layout.component.scss']
})
export class SbLayoutComponent implements OnInit {

  friendsList: Array<any> = undefined;
  invitationsList: Array<any> = undefined;

  constructor(private userConnectionService: UserConnectionService) { }

  ngOnInit(): void {
    this.userConnectionService.getFriendsByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.friendsList = response;
    });

    this.userConnectionService.getInvitationsByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.invitationsList = response;
    });
  }

  cancelInvitation(item): void{
    item.status = 0
    this.userConnectionService.put(item).subscribe(response => item = response)
    const index = this.invitationsList.indexOf(item, 0);
    if (index > -1) {
      this.invitationsList.splice(index, 1);
    }
  }

  acceptInvitation(item): void{
    item.status = 1
    this.userConnectionService.put(item).subscribe(response => item = response)
    const index = this.invitationsList.indexOf(item, 0);
    if (index > -1) {
      this.invitationsList.splice(index, 1);
    }
    this.friendsList.push(item.secondUser)
  }

}
