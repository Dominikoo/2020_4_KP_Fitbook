import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from './../../services/training.session.service';
import { TrainingSessionExcerciseService } from './../../services/training.session.exercise.service';
import { UserProgressService } from './../../services/user.progress.service';
import { AddExercisePopupComponent } from './../../@popups/add-exercise-popup/add-exercise-popup.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class TrainingDetailsComponent implements OnInit {

  training;
  trainingSessions;
  progress: any[] = [];
  bsModalRef: BsModalRef;

  progress_new: any[] = [];     //  Tymczasowa tablica dodająca ćwiczenia
  progress_mod: any[] = [];     //  Tymczasowa tablica modyfikujaca ćwiczenia
  progress_del: any[] = [];     //  Tymczasowa tablica usuwajaca ćwiczenia

  constructor(
    private trainingSessionService: TrainingSessionService,
    private trainingSessionExcerciseService: TrainingSessionExcerciseService,
    private userProgressService: UserProgressService,
    private modalService: BsModalService) { 
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


  //  Powinno: dodać item do progress i progress_new
  addExercise(itemID): void {
    const initialState = { sessionId: itemID }
    this.bsModalRef = this.modalService.show(AddExercisePopupComponent);
    this.bsModalRef.content.onClose.subscribe(response => {
      console.log(this.bsModalRef.content.newExercise);

      console.log(this.training);
      console.log(this.trainingSessions);
      console.log(this.progress);

      this.progress.push()
    })
  }


  //  If item IN progress_new
  //    mod progress AND mod progress_new
  //  else (czyli tylko progress)
  //    add progress -> progress_mod AND mod progress_mod AND mod progress
  //  endif
  modExercise(itemID): void {

  }


  //  If item IN progress_new
  //    del progress AND del progress_new
  //  else (czyli tylko progress)
  //    add progress -> progress_del AND del progress
  //    if item IN progress_mod
  //      del progress_mod
  //  endif
  delExercise(itemID): void {

  }


  save(): void {

  }


  cancel(): void {

  }
}
