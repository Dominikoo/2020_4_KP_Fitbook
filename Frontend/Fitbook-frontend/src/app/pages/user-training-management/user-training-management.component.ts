import { Component, OnInit } from '@angular/core';
import { TrainingPlanService } from './../../services/training.plan.service';
import { UserProgressService } from './../../services/user.progress.service';
import { ProgressLineChartComponent } from './../../charts/progress-line-chart/progress-line-chart.component';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
} from '@angular/forms';
import { FiltersService } from 'src/app/services/filters.service';
import { Router } from '@angular/router';
import { TrainingSessionService } from 'src/app/services/training.session.service';
import { AddTrainingPlanPopupComponent } from './../../@popups/add-training-plan-popup/add-training-plan-popup.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-user-training-management',
  templateUrl: './user-training-management.component.html',
  styleUrls: ['./user-training-management.component.scss']
})
export class UserTrainingManagementComponent implements OnInit {

  form: FormGroup;
  
  chartVisible: boolean = true;

  trainingPlanFilter = {
    difficulty: '1,2,3',
    intensity: '1,2,3',
    length: '1,2,3,4,5',
    type: '1,2,3',
  }

  trainingPlansActive;
  trainingPlansFinished;

  trainingDiffs: Array<any> = undefined;
  trainingLengths: Array<any> = undefined;
  trainingIntensities: Array<any> = undefined;
  trainingTypes: Array<any> = undefined;

  bsModalRef: BsModalRef;

  constructor(private trainingPlanService: TrainingPlanService,
              private trainingFiltersService: FiltersService,
              private formBuilder: FormBuilder,
              private router: Router,
              private trainingSessionService: 
              TrainingSessionService, 
              private userProgressService: UserProgressService,
              private modalService: BsModalService) {
    this.form = this.formBuilder.group({
    diffFilters: new FormArray([]),
    lengthFilters: new FormArray([]),
    intensityFilters: new FormArray([]),
    typeFilters: new FormArray([])
    });

    this.initialize();
    }


  private initialize(): void {
    this.trainingFiltersService.getTrainingDiffs().subscribe(response => {
      this.trainingDiffs = response;
      

      this.trainingDiffs.forEach((o, i) => {
        const control = new FormControl(i === 0); //if first item set to true, else false
        (this.form.controls.diffFilters as FormArray).push(control);
      });

    })

    this.trainingFiltersService.getTrainingLengths().subscribe(response => {
      this.trainingLengths = response;

      this.trainingLengths.forEach((o, i) => {
        const control = new FormControl(i === 0); //if first item set to true, else false
        (this.form.controls.lengthFilters as FormArray).push(control);
      });
    })

    this.trainingFiltersService.getTrainingIntensities().subscribe(response => {
      this.trainingIntensities = response;

      this.trainingIntensities.forEach((o, i) => {
        const control = new FormControl(i === 0); //if first item set to true, else false
        (this.form.controls.intensityFilters as FormArray).push(control);
      });
    })

    this.trainingFiltersService.getTrainingTypes().subscribe(response => {
      this.trainingTypes = response;

      this.trainingTypes.forEach((o, i) => {
        const control = new FormControl(i === 0); //if first item set to true, else false chodzi o checkboxa xddddddd
        (this.form.controls.typeFilters as FormArray).push(control);
      });
    })
    this.filterPlans()

  }   

  ngOnInit(): void { }

  submit(): void {
    const selectedDiffIds = this.form.value.diffFilters
    .map((v, k) => (v ? this.trainingDiffs[k]['id'] : null))
    .filter(v => v !== null);
    
    const selectedIntensityIds = this.form.value.intensityFilters
    .map((v, k) => (v ? this.trainingIntensities[k]['id'] : null))
    .filter(v => v !== null);
    
    const selectedLengthIds = this.form.value.lengthFilters
    .map((v, k) => (v ? this.trainingLengths[k]['id'] : null))
    .filter(v => v !== null);

    const selectedTypeIds = this.form.value.typeFilters
    .map((v, k) => (v ? this.trainingTypes[k]['id'] : null))
    .filter(v => v !== null);

    this.trainingPlanFilter['difficulty'] = selectedDiffIds.toString();
    this.trainingPlanFilter['intensity'] = selectedIntensityIds.toString();
    this.trainingPlanFilter['length'] = selectedLengthIds.toString();
    this.trainingPlanFilter['type'] = selectedTypeIds.toString();

    this.filterPlans();
  }

  filterPlans(): void {
    this.trainingPlanService.getFilteredTrainingPlansForUser(this.trainingPlanFilter, localStorage.getItem('userLogin'), 0).subscribe(
      response => this.trainingPlansActive = response)
    this.trainingPlanService.getFilteredTrainingPlansForUser(this.trainingPlanFilter, localStorage.getItem('userLogin'), 1).subscribe(
      response => this.trainingPlansFinished = response)
  }

  sendTraininigInfo(training) {
    var trainingSessions;
    let progress: Array<any> = [];
    var responses = 0;
    console.log(training);
    this.trainingSessionService.getTrainingSessions(training.id).subscribe(response =>{ 
      trainingSessions = response;
      for(var i=0;i<trainingSessions.length;i++){
        this.userProgressService.getTrainingSessionProgress(trainingSessions[i].id).subscribe( 
          response => {
            responses++;
            progress.push(response)
            if(responses == trainingSessions.length){
              progress = progress.sort((p1, p2) => {
                if(p1[0].trainingSessionExercise.trainingSession.orderNumber > p2[0].trainingSessionExercise.trainingSession.orderNumber){
                  return 1;
                }
                if(p1[0].trainingSessionExercise.trainingSession.orderNumber < p2[0].trainingSessionExercise.trainingSession.orderNumber){
                  return -1;
                }
                return 0;
              });
              this.router.navigate(['/pages/training-details'], {state: {training: training, sessions: trainingSessions, progress: progress}});
            }
          }
        )
      }
    })
  }

  trainingPlan ={
    id: null,
    name: '',
    description: '',
    trainingType: null,
    trainingLength: null,
    trainingIntensity: null,
    trainingDifficulty: null
  }

  addTrainingPlanPopupOpen() : void{
    const initialState = {trainingDiffs: this.trainingDiffs,
                          trainingLengths: this.trainingLengths,
                          trainingIntensities: this.trainingIntensities,
                          trainingTypes: this.trainingTypes,
                          trainingPlan: this.trainingPlan}
    this.bsModalRef = this.modalService.show(AddTrainingPlanPopupComponent, {initialState})
    this.bsModalRef.content.onClose.subscribe(response => {
      this.sendTraininigInfo(this.trainingPlan)
    })
  }

  showChart() : void{
    this.chartVisible = true;
  }

  hideChart() : void{
    this.chartVisible = false;
  }
}