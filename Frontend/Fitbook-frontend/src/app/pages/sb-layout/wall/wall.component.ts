import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';



@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.scss']
})
export class WallComponent implements OnInit {

  posts: Array<any> = undefined;
  user;

  constructor(private postsService: PostService) { }

  ngOnInit(): void {
    this.postsService.getFriendsPostsByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.posts = response;
    });
  }

}
