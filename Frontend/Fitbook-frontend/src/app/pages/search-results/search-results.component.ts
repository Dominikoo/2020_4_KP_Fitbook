import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../services/search.service';
import { UserConnectionService } from './../../services/user.connection.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchedUsers: any;
  count = 0;

  constructor(private searchService: SearchService,
              private userConnectionService: UserConnectionService) { }

  ngOnInit(): void {
    this.searchService.searchUserConnections(localStorage.getItem("phrase"), localStorage.getItem("userLogin")).subscribe(response =>{ 
      this.searchedUsers = response
      this.count = this.searchedUsers.length
      console.log(this.searchedUsers)
    });
  }

  addFriend(item): void{
    item.status = 2
    this.userConnectionService.put(item).subscribe(response => item = response)
  }

  removeFriend(item): void{
    item.status = 0
    this.userConnectionService.put(item).subscribe(response => item = response)
  }

  cancelInvitation(item): void{
    item.status = 0
    this.userConnectionService.put(item).subscribe(response => item = response)
  }

  acceptInvitation(item): void{
    item.status = 1
    this.userConnectionService.put(item).subscribe(response => item = response)
  }

}
