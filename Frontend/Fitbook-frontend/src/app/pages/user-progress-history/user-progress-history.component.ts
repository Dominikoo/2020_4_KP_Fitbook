import { Component, OnInit } from '@angular/core';
import { UserProgressService } from './../../services/user.progress.service';
import { UserWeightHistoryService} from './../../services/user.weight.history.service';
import { AddWeightPopupComponent } from 'src/app/@popups/add-weight-popup/add-weight-popup.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-progress-history',
  templateUrl: './user-progress-history.component.html',
  styleUrls: ['./user-progress-history.component.scss']
})
export class UserProgressHistoryComponent implements OnInit {

  userProgressSummary: any;
  userWeightHistory: any;
  yWeightMin: number;
  yWeightMax: number;
  bsModalRef: BsModalRef;

  constructor(private userProgressService: UserProgressService, private userWeightHistoryService: UserWeightHistoryService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.userProgressService.getUserProgressSummary(localStorage.getItem('userLogin')).subscribe(response =>
      this.userProgressSummary = response);
    this.userWeightHistoryService.getUserWeightHistory(localStorage.getItem('userLogin')).subscribe(response =>{
      this.userWeightHistory = response
      let weight: Array<any> = this.userWeightHistory[0].series;
      this.yWeightMin = Number.MAX_VALUE;
      this.yWeightMax = Number.MIN_VALUE;
      for(var i=0;i<weight.length;i++){
        if(weight[i].value > this.yWeightMax) this.yWeightMax = weight[i].value
        if(weight[i].value < this.yWeightMin) this.yWeightMin = weight[i].value; 
      }
      this.yWeightMax = this.yWeightMax + 20;
      this.yWeightMin = this.yWeightMin - 30;
    });
  }

  addWeight() : void{
    this.bsModalRef = this.modalService.show(AddWeightPopupComponent)
    this.bsModalRef.content.onClose.subscribe(response => {
      console.log(response)
    })
  }
}
