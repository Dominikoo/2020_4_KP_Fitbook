import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionService {
  private url = 'http://localhost:8080/auth/trainingSessions';
  constructor(private httpClient: HttpClient) { }

  getTrainingSessions(TrainingPlanId) {
    console.log(this.url + `/all/${TrainingPlanId}`);
    return this.httpClient.get(this.url + `/all/${TrainingPlanId}`)
  }
}
