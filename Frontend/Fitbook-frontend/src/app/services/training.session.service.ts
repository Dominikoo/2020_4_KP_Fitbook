import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private url = 'https://backend-fitbook.herokuapp.com/auth/trainingSessions';
  // private url = 'http://localhost:8080/auth/trainingSessions';
  constructor(private httpClient: HttpClient) { }

  getTrainingSessions(TrainingPlanId) {
    console.log(this.url + `/all/${TrainingPlanId}`);
    return this.httpClient.get(this.url + `/all/${TrainingPlanId}`)
  }

  deleteTrainingSessions(trainingSessions){
    return this.httpClient.put(this.url + `/delete`, trainingSessions)
  }

  addTrainingSessions(trainingSessions) {
    return this.httpClient.post(this.url + `/post`, trainingSessions)
  }
}
