import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from './../../services/training.session.service';
import { TrainingSessionExcerciseService } from './../../services/training.session.exercise.service';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class TrainingDetailsComponent implements OnInit {

  training;
  trainingSessions;
  exercises: any[] = [];

  constructor(private trainingSessionService: TrainingSessionService, private trainingSessionExcerciseService: TrainingSessionExcerciseService) { 
    this.initialize()
  }

  ngOnInit(): void {
  }

  setStatus(tse): void {
    
  }

  private initialize(): void {
    this.training = history.state.training
    this.trainingSessionService.getTrainingSessions(this.training.id).subscribe(response =>{ 
      this.trainingSessions = response;
      var i = 0;
      for(i=0;i<this.trainingSessions.length;i++){
        this.trainingSessionExcerciseService.getTrainingSessionExercises(this.trainingSessions[i].id).subscribe( 
          response => this.exercises[0] = response)
          console.log(this.exercises);
          console.log(this.exercises[0]);
      }
    })
  }

}
