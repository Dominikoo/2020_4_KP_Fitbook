import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class TrainingPlanService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/trainingPlans';
  // private url = 'https://backend-fitbook.herokuapp.com/auth/trainingPlans';
  // private url = 'http://localhost:8080/auth/trainingPlans';
  constructor(private httpClient: HttpClient) { }

  getFilteredTrainingPlans(filter) {
    return this.httpClient.post(this.url + '/filtered', filter)
  }

  getFilteredTrainingPlansForUser(filter, userLogin, progress) {
    return this.httpClient.post(this.url + `/filtered/${userLogin}/${progress}`, filter)
  }

  postTrainingPlan(trainingPlan, userLogin): any{
    return this.httpClient.post(this.url + `/post/${userLogin}`, trainingPlan)
  }

  deleteTrainingPlan(trainingPlanId): any{
    return this.httpClient.delete(this.url + `/delete/${trainingPlanId}`)
  }

  addTrainigPlanToUser(trainingPlanId, userLogin) {
    return this.httpClient.get(this.url + `/add/${userLogin}/${trainingPlanId}`)
  }

  putTrainingPlan(trainingPlan): any{
    return this.httpClient.put(this.url + `/put`, trainingPlan)
  }
}
