import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/loginIn';
  // private url = 'https://backend-fitbook.herokuapp.com/loginIn';
  // private url = 'http://localhost:8080/loginIn';

  constructor(private httpClient: HttpClient) { }
  logInUser(user) {
    return this.httpClient.post(this.url, user, {responseType: 'text'})
  }
}
