import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { SocialGroupService } from 'src/app/services/social.group.service';

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
  userGroups: Array<any> = undefined

  form = new FormGroup({
    content: new FormControl('', [Validators.required]),
    groupToShare: new FormControl('')
  })

  constructor(public bsModalRef: BsModalRef,
              private postService: PostService,
              private userService: UserService,
              private socialGroupService: SocialGroupService) { }

  ngOnInit(): void {
    this.socialGroupService.getSocialGroupsByUserLogin(localStorage.getItem('userLogin')).subscribe(
      response => {
        this.userGroups = response;
        this.userGroups.unshift(this.getWall())
      });
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
    if(this.form.controls['groupToShare'].value == "Tablica"){
      return {
        content: this.form.controls.content.value,
        user: this.user,
        type: 2,
        sharedTrainingPlan: this.trainingPlan
      }
    }
    else{
      let chosenGroupId: 0;
      this.userGroups.forEach( function(group){
        if(group.name == this.form.controls['groupToShare'].value){
          chosenGroupId = group.id;
        }
      });
      return {
        content: this.form.controls.content.value,
        user: this.user,
        type: 2,
        sharedTrainingPlan: this.trainingPlan,
        socialGroup:{
          id: chosenGroupId
        }
      }
    }
  }

  private getWall(){
    return {
      id: -1,
      name: "Tablica"
    }
  }
}
