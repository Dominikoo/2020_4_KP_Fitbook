import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class PostLikeService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/postLike';
  // private url = 'https://backend-fitbook.herokuapp.com/auth/postLike';
//   private url = 'http://localhost:8080/auth/postLike';
  constructor(private httpClient: HttpClient) { }

//   put(modifiedConnection) {
//     return this.httpClient.put(this.url, modifiedConnection)
//   }

    postPostLike(newLike) {
        return this.httpClient.post<any>(this.url, newLike);
    }

    getLikesByPostId(postId) {
        return this.httpClient.get<any>(this.url+`/${postId}`);
    }

    deletePostLike(userLogin, postId){
      return this.httpClient.delete<any>(this.url+`/${userLogin}/${postId}`)
    }
}