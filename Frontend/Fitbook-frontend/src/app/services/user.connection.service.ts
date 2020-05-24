import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class UserConnectionService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/userConnections';
  // private url = 'https://backend-fitbook.herokuapp.com/auth/userConnections';
  // private url = 'http://localhost:8080/auth/userConnections';
  constructor(private httpClient: HttpClient) { }

  put(modifiedConnection) {
    return this.httpClient.put(this.url, modifiedConnection)
  }

  getFriendsByLogin(userLogin) {
    return this.httpClient.get<any>(this.url+`/friends/byUserLogin/${userLogin}`);
  }

  getInvitationsByLogin(userLogin) {
    return this.httpClient.get<any>(this.url+`/invitations/byUserLogin/${userLogin}`);
  }
}
