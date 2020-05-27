import { Component, OnInit } from '@angular/core';
import { WallService } from 'src/app/services/wall/wall.service';
import { SocialGroupService } from 'src/app/services/social.group.service';

@Component({
  selector: 'app-social-group-management',
  templateUrl: './social-group-management.component.html',
  styleUrls: ['./social-group-management.component.scss']
})
export class SocialGroupManagementComponent implements OnInit {

  groupId: Number = undefined;
  group = {
    name: "",
    description: ""
  };

  constructor(private wallService: WallService,
              private socialGroupService: SocialGroupService) { }

  ngOnInit(): void {
    this.wallService.groupId.subscribe(response => {
      if(response != null && response > -1){
        this.socialGroupService.getSocialGroupByGroupId(response).subscribe(response2 => {
          this.group = response2;
          console.log(this.group);
        });
      }
    });
  }

}
