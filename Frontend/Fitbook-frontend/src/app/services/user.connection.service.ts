import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserConnectionService {
  //private url = 'https://backend-fitbook.herokuapp.com/auth/userConnections';
  private url = 'http://localhost:8080/auth/userConnections';
  constructor(private httpClient: HttpClient) { }

  put(modifiedConnection) {
    return this.httpClient.put(this.url, modifiedConnection)
  }
}
