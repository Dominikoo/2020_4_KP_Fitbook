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
  
  getSocialGroupsByUserLogin(userLogin): any{
    return this.httpClient.get(this.url + `/get/byUserLogin/${userLogin}`);
  }
}
