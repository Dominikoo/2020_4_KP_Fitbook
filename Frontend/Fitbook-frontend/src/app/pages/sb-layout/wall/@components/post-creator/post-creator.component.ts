import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PostService } from 'src/app/services/post.service';
import { NgStyle } from '@angular/common';

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

  form = new FormGroup({
    content: new FormControl('', [Validators.required])
  })

  constructor(private userService: UserService,
              private postService: PostService) { }

  ngOnInit(): void {
    this.userService.getByLogin(localStorage.getItem('userLogin')).subscribe(response => {
      this.user = response;
    });
  }

  postPost() {
    this.postService.postPost(this.preparePost()).subscribe(response => {
      window.location.reload();
    });
  }

  private preparePost() {
    return {
      content: this.form.controls.content.value,
      user: this.user,
      type: 1
    }
  }

}
