import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth';
  // private url = 'https://backend-fitbook.herokuapp.com/auth';
  // private url = 'http://localhost:8080/auth';
  constructor(private httpClient: HttpClient) { }

  getTrainingDiffs() {
    return this.httpClient.get<any>(this.url + '/trainingDiffs')
  }

  getTrainingIntensities() {
    return this.httpClient.get<any>(this.url + '/trainingIntensities')
  }

  getTrainingLengths() {
    return this.httpClient.get<any>(this.url + '/trainingLengths')
  }

  getTrainingTypes() {
    return this.httpClient.get<any>(this.url + '/trainingTypes')
  }

}