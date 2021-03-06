import { Component, OnInit } from '@angular/core';
import { UserConnectionService } from 'src/app/services/user.connection.service';
import { SocialGroupService } from 'src/app/services/social.group.service';
import { AddGroupPopupComponent}from 'src/app/@popups/add-group-popup/add-group-popup.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { WallService } from 'src/app/services/wall/wall.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sb-layout',
  templateUrl: './sb-layout.component.html',
  styleUrls: ['./sb-layout.component.scss']
})
export class SbLayoutComponent implements OnInit {

  userLogin = localStorage.getItem("userLogin");

  friendsList: Array<any> = undefined;
  connectionsList: Array<any> = undefined;
  invitationsList: Array<any> = undefined;
  socialGroupsList: Array<any> = undefined;
  edit = false;
  bsModalRef: BsModalRef;

  constructor(private userConnectionService: UserConnectionService,
              private socialGroupService: SocialGroupService,
              private modalService: BsModalService,
              private wallService: WallService,
              private router: Router) { }

  ngOnInit(): void {
    this.userConnectionService.getFriendsByLogin(this.userLogin).subscribe(response => {
      this.friendsList = response;
    });

    this.userConnectionService.getConnectionsByLogin(this.userLogin).subscribe(response => {
      this.connectionsList = response;
    });

    this.userConnectionService.getInvitationsByLogin(this.userLogin).subscribe(response => {
      this.invitationsList = response;
    });

    this.socialGroupService.getSocialGroupsByUserLogin(this.userLogin).subscribe(response => {
      this.socialGroupsList = response;
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

  removeFriend(item): void{
    item.status = 0;
    this.userConnectionService.put(item).subscribe(response => item = response)
    const index = this.friendsList.indexOf(item.secondUser, 0);
    if (index > -1) {
      this.friendsList.splice(index, 1);
    }

    const index2 = this.connectionsList.indexOf(item, 0);
    if (index2 > -1) {
      this.connectionsList.splice(index2, 1);
    }
  }

  createGroup(): void{
    this.bsModalRef = this.modalService.show(AddGroupPopupComponent)
    this.bsModalRef.content.onClose.subscribe(response => {
      if(response) 
        this.socialGroupService.getSocialGroupsByUserLogin(this.userLogin).subscribe(response => {this.socialGroupsList = response;});
    })
  }

  openSocialGroupPanel(groupId): void {
    this.selectGroup(groupId);
    this.router.navigate(['/pages/social-group-management']);
  }

  selectGroup(groupId): void {
    this.wallService.loadContent(groupId);
  }
}
