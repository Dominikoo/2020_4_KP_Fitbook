import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionExcerciseService {
  private url = 'https://backend-fitbook.herokuapp.com/auth/trainingSessionExercises';
  // private url = 'http://localhost:8080/auth/trainingSessionExercises';
  constructor(private httpClient: HttpClient) { }

  getTrainingSessionExercises(trainingSessionId) {
    console.log(this.url + `/all/${trainingSessionId}`);
    return this.httpClient.get(this.url + `/all/${trainingSessionId}`)
  }

  addTrainingSessionExercises(progress_new) {
    console.log(this.url + `/post`);
    return this.httpClient.post(this.url + `/post`, progress_new);
  }

  updateTrainingSessionExercises(progress_mod) {
    console.log(this.url + `/put`);
    return this.httpClient.put(this.url + `/put`, progress_mod);
  }

  deleteTrainingSessionExercises(progress_del) {
    console.log(this.url + `/delete`);
    return this.httpClient.put(this.url + `/delete`, progress_del);
  }
}
