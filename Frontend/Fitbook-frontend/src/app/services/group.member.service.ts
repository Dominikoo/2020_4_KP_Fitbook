import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class GroupMemberService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/groupMember';
  // private url = 'https://backend-fitbook.herokuapp.com/auth/userConnections';
  // private url = 'http://localhost:8080/auth/userConnections';
  constructor(private httpClient: HttpClient) { }

  put(modifiedGroupMember) {
    return this.httpClient.put(this.url, modifiedGroupMember)
  }

  deleteSocialGroupMember(groupMember) {
    this.httpClient.put(this.url + `/delete`, groupMember);
  }

}
