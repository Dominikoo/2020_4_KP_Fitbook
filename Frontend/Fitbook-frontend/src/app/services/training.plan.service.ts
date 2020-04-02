import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService {
  private url = 'http://localhost:8080/auth/trainingPlans';
  constructor(private httpClient: HttpClient) { }

  getFilteredTrainingPlans(filter) {
    return this.httpClient.post(this.url + '/filtered', filter)
  }

  getFilteredTrainingPlansForUser(filter, userLogin, progress) {
    return this.httpClient.post(this.url + `/filtered/${userLogin}/${progress}`, filter)
  }
}
