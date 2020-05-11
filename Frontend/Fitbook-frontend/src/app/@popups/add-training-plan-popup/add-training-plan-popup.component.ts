import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TrainingPlanService } from 'src/app/services/training.plan.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-training-plan-popup',
  templateUrl: './add-training-plan-popup.component.html',
  styleUrls: ['./add-training-plan-popup.component.scss']
})
export class AddTrainingPlanPopupComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    trainingDifficulty: new FormControl(''),
    trainingType: new FormControl(''),
    trainingIntensity: new FormControl(''),
    trainingLength: new FormControl('')
  });

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
    this.form.controls.trainingType.setValue(this.trainingTypes[0]);
    this.form.controls.trainingDifficulty.setValue(this.trainingDiffs[0]);
    this.form.controls.trainingLength.setValue(this.trainingLengths[0]);
    this.form.controls.trainingIntensity.setValue(this.trainingIntensities[0]);
  }

  onConfirm() {
    this.trainingPlan.name = this.form.controls.name.value;
    this.trainingPlan.description = this.form.controls.description.value;
    this.trainingPlan.trainingDifficulty = this.form.controls.trainingDifficulty.value;
    this.trainingPlan.trainingType = this.form.controls.trainingType.value;
    this.trainingPlan.trainingLength = this.form.controls.trainingLength.value;
    this.trainingPlan.trainingIntensity = this.form.controls.trainingIntensity.value;
    this.trainingPlanService.postTrainingPlan(this.trainingPlan, localStorage.getItem('userLogin')).subscribe(response => {  
      this.trainingPlan.id = response.id;
      this.onClose.next(true);
      this.bsModalRef.hide();
    });
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
