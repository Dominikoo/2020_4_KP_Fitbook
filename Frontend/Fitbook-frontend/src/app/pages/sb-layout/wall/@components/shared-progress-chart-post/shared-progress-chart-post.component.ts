import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PostLikeService } from 'src/app/services/post.like.service';
import { UserService } from 'src/app/services/user.service';
import { PostCommentService } from 'src/app/services/post.comment.service';
import { Router } from '@angular/router';
import { SharedChartDataService } from 'src/app/services/shared.chart.data.service';

@Component({
  selector: 'app-shared-progress-chart-post',
  templateUrl: './shared-progress-chart-post.component.html',
  styleUrls: ['./shared-progress-chart-post.component.scss']
})
export class SharedProgressChartPostComponent implements OnInit {

  @Input() data;
  months: Array<string> = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE",
                        "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];

  progressData: Array<any>;
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
              private sharedChartDataService: SharedChartDataService,
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

    this.sharedChartDataService.getUserProgressByPostId(this.data.id).subscribe(response => {
      this.progressData = response
      let weight: Array<any> = this.progressData[0].series;
      this.yWeightMin = Number.MAX_VALUE;
      this.yWeightMax = Number.MIN_VALUE;
      if(weight != undefined){
        for(var i=0;i<weight.length;i++){
          if(weight[i].value > this.yWeightMax) this.yWeightMax = weight[i].value
          if(weight[i].value < this.yWeightMin) this.yWeightMin = weight[i].value; 
        }
        this.yWeightMax = this.yWeightMax + 20;
        this.yWeightMin = this.yWeightMin - 30;
      }
    })
  }

  likePost() {
    if(!this.alreadyLiked){
      this.postLikeService.postPostLike(this.prepareInfo()).subscribe(response => {
        if(response != null){
          this.likesNumber = this.likesNumber + 1;
          this.alreadyLiked = true;
        }
      });
    }
  }

  dislikePost() {
    if(this.alreadyLiked){
      this.postLikeService.deletePostLike(this.user.login, this.data.id).subscribe(response => {
        if(response != null){
          this.likesNumber = this.likesNumber - 1;
          this.alreadyLiked = false;
        }
      });
    }
  }

  commentOnPost() {
    this.postCommentService.postComment(this.prepareComment()).subscribe(response => {
      this.postCommentService.getCommentsById(this.data.id).subscribe(response => {
        if(response != null){
          this.commentsList = response;
          this.form.controls.commentContent.setValue("")
          this.showComments = true;
        }
      })
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
