import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'https://backend-fitbook.herokuapp.com/users';
  constructor(private httpClient: HttpClient) { }
  getById(userId) {
    return this.httpClient.get<any>(`${this.url}/id/${userId}`)
  }
  getByLogin(userLogin) {
    return this.httpClient.get<any>(`${this.url}/login/${userLogin}`)
  }
  getByEmail(userEmail) {
    return this.httpClient.get<any>(`${this.url}/email/${userEmail}`)
  }
  post(newUser) {
    return this.httpClient.post<any>(this.url, newUser)
  }
  isLoginUsed(userLogin){
    return this.httpClient.get<any>(`${this.url}/existsLogin/${userLogin}`)
  }
  isEmailUsed(userEmail){
    return this.httpClient.get<any>(`${this.url}/existsEmail/${userEmail}`)
  }
  saveUserInfo(){
    
  }
}
