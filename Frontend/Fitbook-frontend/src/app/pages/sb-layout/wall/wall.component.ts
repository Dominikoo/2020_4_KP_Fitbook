import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { WallService } from 'src/app/services/wall/wall.service';
import { SocialGroupService } from 'src/app/services/social.group.service';


@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  groupId: Number = -1;
  group: any;
  posts: Array<any> = undefined;
  user;

  constructor(private postsService: PostService,
              private wallService: WallService,
              private socialGroupService: SocialGroupService) { }

  ngOnInit(): void {
    this.wallService.loadContent(this.groupId);
    this.wallService.groupId.subscribe(response => {
      if(response != null){
        this.groupId = response;
        if(this.groupId != -1){
          this.socialGroupService.getSocialGroupById(this.groupId).subscribe(
            response => {
              this.group = response;
            })
          this.loadGroupPosts(this.groupId)
        }
        else{
          this.loadWallPosts();
        }
      }
    });

    this.loadWallPosts();
  }

  loadWallPosts(): void {
    this.postsService.getFriendsPostsByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.posts = response;
    });
  }

  loadGroupPosts(groupId): void {
    this.postsService.getPostsByGroupId(groupId).subscribe(response => {
      this.posts = response;
    });
  }

}
