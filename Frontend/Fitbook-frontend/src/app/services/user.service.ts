import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:8080/users';
  constructor(private httpClient: HttpClient) { }
  getById(userId) {
    return this.httpClient.get<any>(`${this.url}/${userId}`)
  }
  getByLogin(userLogin) {
    return this.httpClient.get<any>(`${this.url}/${userLogin}`)
  }
  getByEmail(userEmail) {
    return this.httpClient.get<any>(`${this.url}/${userEmail}`)
  }
  post(newUser) {
    return this.httpClient.post<any>(this.url, newUser)
  }
}
