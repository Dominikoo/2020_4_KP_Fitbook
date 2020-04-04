import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainingSessionExcerciseService {
  private url = 'http://localhost:8080/auth/trainingSessionExercises';
  constructor(private httpClient: HttpClient) { }

  getTrainingSessionExercises(trainingSessionId) {
    console.log(this.url + `/all/${trainingSessionId}`);
    return this.httpClient.get(this.url + `/all/${trainingSessionId}`)
  }
}
