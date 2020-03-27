import { Component, OnInit } from '@angular/core';
import { TrainingPlanService } from './../../services/training.plan.service';

@Component({
  selector: 'app-training-management',
  templateUrl: './training-management.component.html',
  styleUrls: ['./training-management.component.scss']
})
export class TrainingManagementComponent implements OnInit {
  
  trainingPlanFilter = {
    difficulty: '1,2,3',
    intensity: '1,2,3',
    length: '1,2,3',
    type: '1,2,3',
  }

  trainingPlans;
  
  constructor(private trainingPlanService: TrainingPlanService) { }

  ngOnInit(): void {
  }

  filterPlans(): void {
    this.trainingPlanService.getFilteredTrainingPlans(this.trainingPlanFilter).subscribe(
    response => this.trainingPlans = response)
  }
}
