import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { SocialGroupService } from 'src/app/services/social.group.service';

@Component({
  selector: 'app-share-user-progress-popup',
  templateUrl: './share-user-progress-popup.component.html',
  styleUrls: ['./share-user-progress-popup.component.scss']
})
export class ShareUserProgressPopupComponent implements OnInit {

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
    let value = this.form.controls['groupToShare'].value;
    if(value == "Tablica" || value == ""){
      return {
        content: this.form.controls.content.value,
        user: this.user,
        type: 4,
      }
    }
    else{
      let chosenGroupId: 0;
      this.userGroups.forEach( function(group){
        if(group.name == value){
          chosenGroupId = group.id;
        }
      });
      return {
        content: this.form.controls.content.value,
        user: this.user,
        type: 4,
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
