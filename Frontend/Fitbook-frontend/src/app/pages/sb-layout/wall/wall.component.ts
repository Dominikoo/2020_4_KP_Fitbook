import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { WallService } from 'src/app/services/wall/wall.service';



@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  groupId: Number = -1;
  posts: Array<any> = undefined;
  user;

  constructor(private postsService: PostService,
              private wallService: WallService) { }

  ngOnInit(): void {
    this.wallService.groupId.subscribe(response => {
      if(response != null){
        this.groupId = response;
        this.loadPosts();
      }
    });

    this.loadPosts();
  }

  loadPosts(): void {
    this.postsService.getFriendsPostsByLogin(localStorage.getItem('userLogin'), this.groupId).subscribe(response => {   // If groupId == -1 then normal wall
      this.posts = response;
    });
  }

}
