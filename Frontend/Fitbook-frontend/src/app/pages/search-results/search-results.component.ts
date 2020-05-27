import { Component, OnInit } from '@angular/core';
import { SearchService } from './../../services/search.service';
import { TrainingPlanService } from './../../services/training.plan.service';
import { TrainingAddedInfoPopupComponent } from './../../@popups/training-added-info-popup/training-added-info-popup.component'
import { UserConnectionService } from './../../services/user.connection.service';
import { GroupMemberService } from './../../services/group.member.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  searchedUsers: any;
  searchedSocialGroups: any;
  searchedTrainingPlans: any;
  countUsers = 0;
  countSocialGroups: 0;
  countTrainingPlans = 0;

  bsModalRef: BsModalRef;

  constructor(private searchService: SearchService,
              private trainingPlanService: TrainingPlanService,
              private userConnectionService: UserConnectionService,
              private groupMemberService: GroupMemberService,
              private modalService: BsModalService,
              private router: Router) { }

  ngOnInit(): void {
    this.searchService.searchUserConnections(localStorage.getItem("phrase"), localStorage.getItem("userLogin")).subscribe(response =>{ 
      this.searchedUsers = response
      this.countUsers = this.searchedUsers.length
    });
    this.searchService.searchSocialGroupsByText(localStorage.getItem("phrase"), localStorage.getItem("userLogin")).subscribe(response =>{
      this.searchedSocialGroups = response
      this.countSocialGroups = this.searchedSocialGroups.length
      console.log(response)
    })
    this.searchService.searchTrainingPlansByText(localStorage.getItem("phrase")).subscribe(response =>{
      this.searchedTrainingPlans = response
      this.countTrainingPlans = this.searchedTrainingPlans.length
    })
  }

  addFriend(item): void{
    item.status = 3
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

  askForJoinToGroup(item): void{
    item.status = 2
    this.groupMemberService.put(item).subscribe(response => item = response)
  }

  leaveGroup(item): void{
    item.status = 0
    this.groupMemberService.put(item).subscribe(response => item = response)
  }

  cancelAskForJoinToGroup(item): void{
    item.status = 0
    this.groupMemberService.put(item).subscribe(response => item = response)
  }

  addTraining(item): void{
    this.bsModalRef = this.modalService.show(TrainingAddedInfoPopupComponent)
    this.trainingPlanService.addTrainigPlanToUser(item.id, localStorage.getItem('userLogin')).subscribe()
    this.bsModalRef.content.onClose.subscribe(response => {
      if(response){
        this.router.navigate(['/pages/user-training'])
      }
    })
  }

}
