import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PostLikeService } from 'src/app/services/post.like.service';
import { UserService } from 'src/app/services/user.service';
import { PostCommentService } from 'src/app/services/post.comment.service';
import { TrainingPlanService } from 'src/app/services/training.plan.service';
import { Router } from '@angular/router';
import { UserWeightHistoryService } from 'src/app/services/user.weight.history.service';

@Component({
  selector: 'app-shared-weight-chart-post',
  templateUrl: './shared-weight-chart-post.component.html',
  styleUrls: ['./shared-weight-chart-post.component.scss']
})
export class SharedWeightChartPostComponent implements OnInit {

  @Input() data;
  months: Array<string> = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE",
                        "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];

  userWeightHistory: Array<any>;
  yWeightMax;
  yWeightMin;

  alreadyLiked: boolean = false;
  showComments: boolean = false;
  user;
  likesNumber: number = 0;

  bsModalRef: BsModalRef;

  commentsList: Array<any> = undefined;
  form = new FormGroup({
    commentContent: new FormControl('', [Validators.required])
  })

  constructor(private postLikeService: PostLikeService,
              private userService: UserService,
              private postCommentService: PostCommentService,
              private userWeightHistoryService: UserWeightHistoryService,
              private router: Router) { }

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

    this.userWeightHistoryService.getUserWeightHistoryByPostId(this.data.id).subscribe(response => {
      this.userWeightHistory = response
      let weight: Array<any> = this.userWeightHistory[0].series;
      this.yWeightMin = Number.MAX_VALUE;
      this.yWeightMax = Number.MIN_VALUE;
      for(var i=0;i<weight.length;i++){
        if(weight[i].value > this.yWeightMax) this.yWeightMax = weight[i].value
        if(weight[i].value < this.yWeightMin) this.yWeightMin = weight[i].value; 
      }
      this.yWeightMax = this.yWeightMax + 20;
      this.yWeightMin = this.yWeightMin - 30;
    })
  }

  likePost() {
    if(!this.alreadyLiked){
      this.postLikeService.postPostLike(this.prepareInfo()).subscribe(response => {
        console.log(response);
        if(response != null){
          this.likesNumber = this.likesNumber + 1;
          this.alreadyLiked = true;
        }
      });
    }
    console.log(this.data.publicationDate);
  }

  dislikePost() {
    if(this.alreadyLiked){
      this.postLikeService.deletePostLike(this.user.login, this.data.id).subscribe(response => {
        console.log(response);
        if(response != null){
          this.likesNumber = this.likesNumber - 1;
          this.alreadyLiked = false;
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
