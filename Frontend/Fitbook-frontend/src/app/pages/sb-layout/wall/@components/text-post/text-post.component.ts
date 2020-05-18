import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostLikeService } from 'src/app/services/post.like.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.scss']
})
export class TextPostComponent implements OnInit {

  @Input() data;
  user;
  likesNumber: number = 0;

  constructor(private postLikeService: PostLikeService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.user = response;
    });

    this.postLikeService.getLikesByPostId(this.data.id).subscribe(response => {
      if(response != null){
        this.likesNumber = response;
      }
    });
  }

  likePost() {
    this.postLikeService.postPostLike(this.prepareLike()).subscribe(response => {
      if(response != null){
        this.likesNumber = this.likesNumber + 1;
      }
    });
  }

  private prepareLike() {
    return {
      user: this.user,
      post: this.data
    };
  }

}
