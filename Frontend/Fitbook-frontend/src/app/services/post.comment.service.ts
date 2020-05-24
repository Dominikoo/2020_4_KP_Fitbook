import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/comment';
  // private url = 'https://backend-fitbook.herokuapp.com/auth/comment';
//   private url = 'http://localhost:8080/auth/comment';
  constructor(private httpClient: HttpClient) { }

    postComment(newComment) {
        return this.httpClient.post<any>(this.url, newComment);
    }

    getCommentsById(postId) {
        return this.httpClient.get<any>(this.url+`/${postId}`);
    }
}