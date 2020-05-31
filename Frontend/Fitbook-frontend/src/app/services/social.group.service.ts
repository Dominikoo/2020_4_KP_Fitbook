import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class SocialGroupService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/socialGroups';

  constructor(private httpClient: HttpClient) { }
  
  postSocialGroup(socialGroup): any{
    return this.httpClient.post(this.url + `/post`, socialGroup)
  }

  putSocialGroup(modifiedSocialGroup): any{
    return this.httpClient.put(this.url + `/put`, modifiedSocialGroup)
  }

  getSocialGroupsByUserLogin(userLogin): any{
    return this.httpClient.get(this.url + `/get/byUserLogin/${userLogin}`);
  }

  getSocialGroupById(groupId): any{
    return this.httpClient.get(this.url + `/get/byId/${groupId}`);
  }

  getMembersByGroupId(groupId): any {
    return this.httpClient.get(this.url + `/getMembers/byId/${groupId}`)
  }

  getPendingMembersByGroupId(groupId): any {
    return this.httpClient.get(this.url + `/getPendingMembers/byId/${groupId}`)
  }
}
