import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserWeightHistoryService {
  private url = 'https://backend-fitbook.herokuapp.com/auth/userWeightHistory';
  //private url = 'http://localhost:8080/auth/userWeightHistory';
  constructor(private httpClient: HttpClient) { }

  post(userWeightHistory, userLogin): any{
    return this.httpClient.post<any>(this.url + `/post/${userLogin}`, userWeightHistory)
  }

  getUserWeightHistory(userLogin): any{
      return this.httpClient.get<any>(this.url + `/get/all/${userLogin}`)
  }
}
