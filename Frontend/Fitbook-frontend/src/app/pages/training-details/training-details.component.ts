import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from './../../services/training.session.service';
import { TrainingSessionExcerciseService } from './../../services/training.session.exercise.service';
import { UserProgressService } from './../../services/user.progress.service';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class TrainingDetailsComponent implements OnInit {

  training;
  trainingSessions;
  progress: any[] = [];

  constructor(private trainingSessionService: TrainingSessionService, private trainingSessionExcerciseService: TrainingSessionExcerciseService,
    private userProgressService: UserProgressService) { 
    this.initialize()
  }

  ngOnInit(): void {
  }

  private initialize(): void {
    this.training = history.state.training
    this.trainingSessions = history.state.sessions
    this.progress = history.state.progress
  }

  isTrainingDone(exercises): boolean{
    var done = true;
    for(var i=0;i<exercises.length;i++){
      if(exercises[i].progress == 0) done = false; 
    }
    return done;
  }

  isChecked(userProgress): boolean{
    return userProgress.progress == 1;
  }

  changeProgress(userProgress): void{
    if(userProgress.progress == 1) userProgress.progress = 0
    else userProgress.progress = 1
    this.userProgressService.updateUserProgress(userProgress).subscribe(response => console.log(response));
  }
}
