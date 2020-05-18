import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostLikeService } from 'src/app/services/post.like.service';
import { UserService } from 'src/app/services/user.service';
import { PostCommentService } from 'src/app/services/post.comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-text-post',
  templateUrl: './text-post.component.html',
  styleUrls: ['./text-post.component.scss']
})
export class TextPostComponent implements OnInit {

  @Input() data;
  alreadyLiked: boolean = false;
  showComments: boolean = false;
  user;
  likesNumber: number = 0;

  commentsList: Array<any> = undefined;
  form = new FormGroup({
    commentContent: new FormControl('', [Validators.required])
  })

  constructor(private postLikeService: PostLikeService,
              private userService: UserService,
              private postCommentService: PostCommentService) { }

  ngOnInit(): void {
    this.userService.getByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.user = response;
    });

    this.postLikeService.getLikesByPostId(this.data.id).subscribe(response => {
      if(response != null){
        response.forEach(element => {
          if(element.user.login == localStorage.getItem('userLogin')){
            this.alreadyLiked = true;
          }
        });
        this.likesNumber = response.length;
      }
    });

    this.postCommentService.getCommentsById(this.data.id).subscribe(response => {
      if(response != null){
        this.commentsList = response;
      }
    })
  }

  likePost() {
    if(!this.alreadyLiked){
      this.postLikeService.postPostLike(this.prepareInfo()).subscribe(response => {
        console.log(response);
        if(response != null){
          this.likesNumber = this.likesNumber + 1;
        }
      });
    }
  }

  commentOnPost() {
    this.postCommentService.postComment(this.prepareComment()).subscribe(response => {
      window.location.reload();
    });
  }

  private prepareInfo() {
    return {
      user: this.user,
      post: this.data
    };
  }

  private prepareComment() {
    return {
      user: this.user,
      post: this.data,
      commentContent: this.form.controls.commentContent.value
    };
  }

}
