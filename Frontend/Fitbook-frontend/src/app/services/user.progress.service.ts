import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class UserProgressService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/userProgress';
  // private url = 'https://backend-fitbook.herokuapp.com/auth/userProgress';
  //private url = 'http://localhost:8080/auth/userProgress';
  constructor(private httpClient: HttpClient) { }

  getTrainingSessionProgress(trainingSessionId) {
    console.log(this.url + `/all/${trainingSessionId}`);
    return this.httpClient.get(this.url + `/all/${trainingSessionId}`)
  }

  updateUserProgress(userProgress){
    console.log(this.url + `/put`)
    return this.httpClient.put(this.url + `/put`, userProgress)
  }

  getUserProgressSummary(userLogin){
    return this.httpClient.get(this.url + `/get/summary/${userLogin}`);
  }
}
