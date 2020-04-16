import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from './../../services/training.session.service';
import { TrainingSessionExcerciseService } from './../../services/training.session.exercise.service';
import { UserProgressService } from './../../services/user.progress.service';
import { AddExercisePopupComponent } from './../../@popups/add-exercise-popup/add-exercise-popup.component'
import { AddTrainingSessionPopupComponent } from './../../@popups/add-training-session-popup/add-training-session-popup.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { isNgTemplate } from '@angular/compiler';
import { ModifyExercisePopupComponent } from 'src/app/@popups/modify-exercise-popup/modify-exercise-popup.component';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class TrainingDetailsComponent implements OnInit {

  editMode = false; 

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


  addExercise(sessionObject): void {
    this.bsModalRef = this.modalService.show(AddExercisePopupComponent);
    this.bsModalRef.content.onClose.subscribe(response => {

      if(response){
        let sessionLatestId = 1
        let exerciseLatestId = 1;
        let orderNumberLatest = 1;
        
        for (let list of this.progress) {
          for (let prog of list){
            if (sessionLatestId <= prog['trainingSessionExercise']['id']) {
              sessionLatestId = prog['trainingSessionExercise']['id'] + 1;
            }
            if (exerciseLatestId <= prog['trainingSessionExercise']['exercise']['id']) {
              exerciseLatestId = prog['trainingSessionExercise']['exercise']['id'] + 1;
            }
          }
          if (list[0]['trainingSessionExercise']['trainingSession']['id'] == sessionObject.id) {
            orderNumberLatest = list.length + 1;
          }
        }
      
        // utworzenie nowego obiektu
      
        let new_progress = {
          user: {
            login: localStorage.getItem('userLogin')
          },
          trainingSessionExercise: {
            id: sessionLatestId,
            exercise: this.bsModalRef.content.newExercise,
            trainingSession: sessionObject,
            orderNumber: orderNumberLatest
          },
          progress: 0
        
        };
      
        // Dodanie referencji na nowo utworzony obiekt do progress i progress_new
      
        this.progress[sessionObject.id - 1].push(new_progress);
      
        this.progress_new.push(new_progress);
      
        console.log(this.progress);
        console.log(this.progress_new);
      }
    });
  }


  //  If item IN progress_new
  //    mod progress AND mod progress_new
  //  else (czyli tylko progress)
  //    add progress -> progress_mod AND mod progress_mod AND mod progress
  //  endif
  modExercise(item): void {

    const initialState = { exercise: item['trainingSessionExercise']['exercise'] };

    this.bsModalRef = this.modalService.show(ModifyExercisePopupComponent, { initialState });
    this.bsModalRef.content.onClose.subscribe(response => {

      console.log(item);

      if ( this.progress_new.indexOf(item) < 0){
        if (this.progress_mod.indexOf(item) < 0){
          this.progress_mod.push(item);
        }
      }

      console.log(this.progress_mod);
    });
  }


  //  If item IN progress_new
  //    del progress AND del progress_new
  //  else (czyli tylko progress)
  //    add progress -> progress_del AND del progress
  //    if item IN progress_mod
  //      del progress_mod
  //  endif
  delExercise(sessionObject, item): void {
    if ( this.progress_new.indexOf( item ) > -1){
      
      console.log('delExercise if');

      const index1 = this.progress_new.indexOf(item, 0);
      if (index1 > -1) {
        this.progress_new.splice(index1, 1);
        console.log('Usuwanie w progress_new: ', this.progress_new);
      }

      const index2 = this.progress[sessionObject.id - 1].indexOf(item, 0);
      if (index2 > -1) {
        this.progress[sessionObject.id - 1].splice(index2, 1);
        console.log('Usuwanie w progress_new: ', this.progress);
      }
    } else {

      console.log('delExercise else');

      this.progress_del.push(item);

      const index1 = this.progress[sessionObject.id - 1].indexOf(item, 0);
      if (index1 > -1) {
        this.progress[sessionObject.id - 1].splice(index1, 1);
      }

      const index2 = this.progress_mod.indexOf(item, 0);
      if (index2 > -1) {
        this.progress_mod.splice(index2, 1);
      }

    }
  }

  addTrainingSessionPopupOpen() : void{
    this.bsModalRef = this.modalService.show(AddTrainingSessionPopupComponent)
  }

  enableEditMode(): void{
    this.editMode = true;
  }

  cancel() : void{
    this.editMode = false;
  }

  save() : void{
    this.editMode = false;
  }
}
