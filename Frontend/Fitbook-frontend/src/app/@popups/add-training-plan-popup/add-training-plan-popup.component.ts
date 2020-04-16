import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TrainingPlanService } from 'src/app/services/training.plan.service';

@Component({
  selector: 'app-add-training-plan-popup',
  templateUrl: './add-training-plan-popup.component.html',
  styleUrls: ['./add-training-plan-popup.component.scss']
})
export class AddTrainingPlanPopupComponent implements OnInit {

  public onClose: Subject<boolean>;

  trainingDiffs: Array<any> = undefined
  trainingLengths: Array<any> = undefined
  trainingIntensities: Array<any> = undefined
  trainingTypes: Array<any> = undefined

  trainingPlan: any;

  constructor(
    public bsModalRef: BsModalRef,
    private localeService: BsLocaleService,
    private router: Router,
    private trainingPlanService: TrainingPlanService
    ) { }

  ngOnInit() {
    this.localeService.use('pl');
    this.onClose = new Subject();
    this.trainingPlan.trainingType = this.trainingTypes[0];
    this.trainingPlan.trainingDifficulty = this.trainingDiffs[0];
    this.trainingPlan.trainingLength = this.trainingLengths[0];
    this.trainingPlan.trainingIntensity = this.trainingIntensities[0];
  }

  onConfirm() {
    this.trainingPlanService.postTrainingPlan(this.trainingPlan, localStorage.getItem('userLogin')).subscribe(response => {  
      this.trainingPlan.id = response.id;
      this.onClose.next(true);
      this.bsModalRef.hide()
    });
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
