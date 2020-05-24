import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class UserWeightHistoryService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/userWeightHistory';
  // private url = 'https://backend-fitbook.herokuapp.com/auth/userWeightHistory';
  //private url = 'http://localhost:8080/auth/userWeightHistory';
  constructor(private httpClient: HttpClient) { }

  post(userWeightHistory, userLogin): any{
    return this.httpClient.post<any>(this.url + `/post/${userLogin}`, userWeightHistory)
  }

  getUserWeightHistory(userLogin): any{
      return this.httpClient.get<any>(this.url + `/get/all/${userLogin}`)
  }

  getUserWeightHistoryByPostId(postId): any{
    return this.httpClient.get<any>(this.url + `/get/byPostId/${postId}`)
}

  existsWeightHistory(userLogin, date): any{
    return this.httpClient.get<any>(this.url + `/get/exists/${userLogin}/${date}`)
  }
}
