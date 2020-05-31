import { Component, OnInit } from '@angular/core';
import { WallService } from 'src/app/services/wall/wall.service';
import { SocialGroupService } from 'src/app/services/social.group.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import { GroupMemberService } from 'src/app/services/group.member.service';

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
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('')
  })
  previousName: boolean = false;
  savedSuccessfully: boolean = undefined;

  historyGroup = {
    name: '',
    description: ''
  }

  members: Array<any> = undefined;
  pendingMembers: Array<any> = undefined;

  constructor(private wallService: WallService,
              private socialGroupService: SocialGroupService,
              private groupMemberService: GroupMemberService) { }

  ngOnInit(): void {
    this.wallService.groupId.subscribe(response => {
      if(response != null && response > -1){
        this.socialGroupService.getSocialGroupById(response).subscribe(response2 => {
          this.group.controls.id.setValue(response2.id);
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
            console.log(this.pendingMembers);
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
    if(this.historyGroup.name == this.group.controls.name.value && this.historyGroup.description == this.group.controls.description.value) this.previousName = true;
    else {
      this.socialGroupService.putSocialGroup(this.group.getRawValue()).subscribe(response => {
        console.log(response);
        if(response != null) {
          this.savedSuccessfully = true;
          window.location.reload();
        }
        else this.savedSuccessfully = false;
      });
    }
  }

  removeMember(item): void {
    this.groupMemberService.deleteSocialGroupMember(item.id).subscribe()
    const index = this.members.indexOf(item, 0);
    if (index > -1) {
      this.members.splice(index, 1);
    }
  }

  acceptRequest(item): void {
    item.status = 1;
    this.groupMemberService.put(item).subscribe(response => {
      console.log(response);
      window.location.reload();
    })
  }
}
