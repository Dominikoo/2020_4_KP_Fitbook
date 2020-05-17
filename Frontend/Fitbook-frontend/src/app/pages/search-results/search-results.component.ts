import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchedUsers: any;

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.searchUsers(localStorage.getItem("phrase")).subscribe(response =>{ 
      this.searchedUsers = response
      console.log(this.searchedUsers)
    });
  }

}
