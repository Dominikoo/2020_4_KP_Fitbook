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
    
    this.trainingPlanService.getFilteredTrainingPlans(this.trainingPlanFilter).subscribe(
    response => this.trainingPlans = response)
  }
}
