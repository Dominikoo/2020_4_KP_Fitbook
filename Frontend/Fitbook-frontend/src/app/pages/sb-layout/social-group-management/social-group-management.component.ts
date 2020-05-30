import { Component, OnInit } from '@angular/core';
import { WallService } from 'src/app/services/wall/wall.service';
import { SocialGroupService } from 'src/app/services/social.group.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-social-group-management',
  templateUrl: './social-group-management.component.html',
  styleUrls: ['./social-group-management.component.scss']
})
export class SocialGroupManagementComponent implements OnInit {

  searchForm = new FormGroup({
    search: new FormControl('')
  });

  groupId: Number = undefined;
  group = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  })
  historyGroup = {
    name: '',
    description: ''
  }

  members: Array<any> = undefined;
  pendingMembers: Array<any> = undefined;

  constructor(private wallService: WallService,
              private socialGroupService: SocialGroupService) { }

  ngOnInit(): void {
    this.wallService.groupId.subscribe(response => {
      if(response != null && response > -1){
        this.socialGroupService.getSocialGroupById(response).subscribe(response2 => {
          this.group.controls.name.setValue(response2.name);
          this.group.controls.description.setValue(response2.description);
          this.historyGroup = response2;
          console.log(response2);
        });
        this.socialGroupService.getMembersByGroupId(response).subscribe(response3 => {
          if(response != null) {
            this.members = response3;
          }
        })
        this.socialGroupService.getPendingMembersByGroupId(response).subscribe(response4 => {
          if(response != null) {
            this.pendingMembers = response4;
          }
        })
      }
    });
  }

  foundMember(item): boolean {
    if(item.firstName.indexOd(this.searchForm.controls.search.value) >= 0) return true;
    if(item.lastName.indexOd(this.searchForm.controls.search.value) >= 0) return true;
    if(item.login.indexOd(this.searchForm.controls.search.value) >= 0) return true;
    return false;
  }

  saveChanges(): void {
    
  }

  removeMember(item): void {

  }

  acceptRequest(item): void {

  }

  denyRequest(item): void {

  }
}
