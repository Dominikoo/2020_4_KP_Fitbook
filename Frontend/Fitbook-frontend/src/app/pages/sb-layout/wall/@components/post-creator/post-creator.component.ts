import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { NgStyle } from '@angular/common';
import { WallService } from 'src/app/services/wall/wall.service';

@Component({
  selector: 'app-post-creator',
  templateUrl: './post-creator.component.html',
  styleUrls: ['./post-creator.component.scss']
})
export class PostCreatorComponent implements OnInit {

  user = {
    firstName: '',
    lastName: '',
    login: ''
  };

  groupId;

  form = new FormGroup({
    content: new FormControl('', [Validators.required])
  })

  constructor(private userService: UserService,
              private postService: PostService,
              private wallService: WallService) { }

  ngOnInit(): void {
    this.userService.getByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.user = response;
    });
    this.wallService.groupId.subscribe(response => {
      this.groupId = response
    });
  }

  postPost() {
    this.postService.postPost(this.preparePost()).subscribe(response => {
      window.location.reload();
    });
  }

  private preparePost() {
    return this.groupId == -1 ? 
    {
      content: this.form.controls.content.value,
      user: this.user,
      type: 1
    }
    :
    {
      content: this.form.controls.content.value,
      user: this.user,
      type: 1,
      socialGroup: {
        id: this.groupId
      }
    }
  }

}
