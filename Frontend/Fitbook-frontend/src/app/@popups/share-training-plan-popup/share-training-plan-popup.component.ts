import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-share-training-plan-popup',
  templateUrl: './share-training-plan-popup.component.html',
  styleUrls: ['./share-training-plan-popup.component.scss']
})
export class ShareTrainingPlanPopupComponent implements OnInit {

  public onClose: Subject<boolean>;

  trainingPlan: any;
  user = {
    firstName: '',
    lastName: '',
    login: ''
  };

  form = new FormGroup({
    content: new FormControl('', [Validators.required])
  })

  constructor(public bsModalRef: BsModalRef,
              private postService: PostService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.user = response;
    });
    this.onClose = new Subject();
  }

  onConfirm() {
    this.postService.postPost(this.preparePost()).subscribe(response => console.log(response))
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

  
  private preparePost() {
    return {
      content: this.form.controls.content.value,
      user: this.user,
      type: 2,
      sharedTrainingPlan: this.trainingPlan
    }
  }

}
