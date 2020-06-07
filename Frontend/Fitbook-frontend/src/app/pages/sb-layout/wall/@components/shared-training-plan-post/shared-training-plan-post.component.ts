import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostLikeService } from 'src/app/services/post.like.service';
import { UserService } from 'src/app/services/user.service';
import { PostCommentService } from 'src/app/services/post.comment.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TrainingAddedInfoPopupComponent } from './../../../../../@popups/training-added-info-popup/training-added-info-popup.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { TrainingPlanService } from './../../../../../services/training.plan.service';

@Component({
  selector: 'app-shared-training-plan-post',
  templateUrl: './shared-training-plan-post.component.html',
  styleUrls: ['./shared-training-plan-post.component.scss']
})
export class SharedTrainingPlanPostComponent implements OnInit {

  @Input() data;
  months: Array<string> = ["STY", "LUT", "MAR", "KWI", "MAJ", "CZE",
                        "LIP", "SIE", "WRZ", "PAŹ", "LIS", "GRU"];
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
              private trainingPlanService: TrainingPlanService,
              private modalService: BsModalService,
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
      this.postCommentService.getCommentsById(this.data.id).subscribe(response => {
        if(response != null){
          this.commentsList = response;
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

  addTraining(item): void{
    this.bsModalRef = this.modalService.show(TrainingAddedInfoPopupComponent)
    this.trainingPlanService.addTrainigPlanToUser(item.id, localStorage.getItem('userLogin')).subscribe()
    this.bsModalRef.content.onClose.subscribe(response => {
      if(response){
        this.router.navigate(['/pages/user-training'])
      }
    })
  }
}
