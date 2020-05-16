import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  //private url = 'https://backend-fitbook.herokuapp.com/auth/search';
  private url = 'http://localhost:8080/auth/search';
  constructor(private httpClient: HttpClient) { }

  searchUsers(phrase) {
    return this.httpClient.get(this.url+`/users/${phrase}`)
  }
}
