import { Component, OnInit } from '@angular/core';
import { TrainingPlanService } from './../../services/training.plan.service';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { FiltersService } from 'src/app/services/filters.service';


@Component({
  selector: 'app-training-management',
  templateUrl: './training-management.component.html',
  styleUrls: ['./training-management.component.scss']
})
export class TrainingManagementComponent implements OnInit {

  form: FormGroup;
  
  trainingPlanFilter = {
    difficulty: '1,2,3',
    intensity: '1,2,3',
    length: '1,2,3',
    type: '1,2,3',
  }

  trainingPlans;

  trainingDiffs: Array<any> = undefined;
  trainingLengths: Array<any> = undefined;
  trainingIntensities: Array<any> = undefined;
  trainingTypes: Array<any> = undefined;

  constructor(private trainingPlanService: TrainingPlanService,
              private trainingFiltersService: FiltersService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
    diffFilters: new FormArray([])
    // lengthFilters: new FormArray([]),
    // intensityFilters: new FormArray([]),
    // typeFilters: new FormArray([])
    });

    this.addCheckboxes();
    }

  private addCheckboxes(): void {
    this.initialize();

    this.trainingDiffs.forEach((id, code, displayName) => {
      const control = new FormControl(id === 0); //if first item set to true, else false
      (this.form.controls.diffFilters as FormArray).push(control);
    });
    // this.trainingLengths.forEach((id, code, displayName) => {
    //   const control = new FormControl(id === 0); //if first item set to true, else false
    //   (this.form.controls.lengthFilters as FormArray).push(control);
    // });
    // this.trainingIntensities.forEach((id, code, displayName) => {
    //   const control = new FormControl(id === 0); //if first item set to true, else false
    //   (this.form.controls.intensityFilters as FormArray).push(control);
    // });
    // this.trainingTypes.forEach((id, code, displayName) => {
    //   const control = new FormControl(id === 0); //if first item set to true, else false
    //   (this.form.controls.typeFilters as FormArray).push(control);
    // });
  }
  private initialize(): void {
    this.trainingFiltersService.getTrainingDiffs().subscribe(response => {
      this.trainingDiffs = response;
    })

    // this.trainingFiltersService.getTrainingLengths().subscribe(response => {
    //   this.trainingLengths = response;
    // })

    // this.trainingFiltersService.getTrainingIntensities().subscribe(response => {
    //   this.trainingIntensities = response;
    // })

    // this.trainingFiltersService.getTrainingTypes().subscribe(response => {
    //   this.trainingTypes = response;
    // })
  }   

  ngOnInit(): void { }

  filterPlans(): void {
    this.trainingPlanService.getFilteredTrainingPlans(this.trainingPlanFilter).subscribe(
    response => this.trainingPlans = response)
  }
}
