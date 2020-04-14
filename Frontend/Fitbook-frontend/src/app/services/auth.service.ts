import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://backend-fitbook.herokuapp.com/loginIn';
  constructor(private httpClient: HttpClient) { }
  logInUser(user) {
    return this.httpClient.post(this.url, user, {responseType: 'text'})
  }
}
