import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  urlContainer = new UrlContainer();
  
  private url = this.urlContainer.url + '/auth/post';
  // private url = 'https://backend-fitbook.herokuapp.com/auth/post';
  // private url = 'http://localhost:8080/auth/post';
  constructor(private httpClient: HttpClient) { }

//   put(modifiedConnection) {
//     return this.httpClient.put(this.url, modifiedConnection)
//   }

    postPost(newPost) {
        return this.httpClient.post<any>(this.url, newPost);
    }

    getFriendsPostsByLogin(userLogin) {
        return this.httpClient.get<any>(this.url+`/friends/byUserLogin/${userLogin}`);
    }
}