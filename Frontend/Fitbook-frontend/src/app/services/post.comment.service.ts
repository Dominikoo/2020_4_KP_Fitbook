import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostCommentService {
  //private url = 'https://backend-fitbook.herokuapp.com/auth/comment';
  private url = 'http://localhost:8080/auth/comment';
  constructor(private httpClient: HttpClient) { }

//   put(modifiedConnection) {
//     return this.httpClient.put(this.url, modifiedConnection)
//   }

    postComment(newComment) {
        return this.httpClient.post<any>(this.url, newComment);
    }

    getCommentsById(postId) {
        return this.httpClient.get<any>(this.url+`/${postId}`);
    }
}