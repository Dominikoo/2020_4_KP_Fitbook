import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:8080/loginIn';
  constructor(private httpClient: HttpClient) { }
  logInUser(user) {
    return this.httpClient.post(this.url, user, {responseType: 'text'})
  }
}
