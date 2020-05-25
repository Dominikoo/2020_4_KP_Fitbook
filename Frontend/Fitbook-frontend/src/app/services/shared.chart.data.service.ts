import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlContainer } from './url';

@Injectable({
  providedIn: 'root'
})
export class SharedChartDataService {
  urlContainer = new UrlContainer();

  private url = this.urlContainer.url + '/auth/sharedChartData';

  constructor(private httpClient: HttpClient) { }
  
  getUserProgressByPostId(postId): any{
    return this.httpClient.get(this.url + `/get/byPostId/${postId}`);
  }
}
