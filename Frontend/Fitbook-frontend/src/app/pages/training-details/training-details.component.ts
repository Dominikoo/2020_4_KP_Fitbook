import { Component, OnInit } from '@angular/core';
import { TrainingSessionService } from './../../services/training.session.service';
import { TrainingSessionExcerciseService } from './../../services/training.session.exercise.service';
import { UserProgressService } from './../../services/user.progress.service';
import { AddExercisePopupComponent } from './../../@popups/add-exercise-popup/add-exercise-popup.component'
import { AddTrainingSessionPopupComponent } from './../../@popups/add-training-session-popup/add-training-session-popup.component'
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { isNgTemplate } from '@angular/compiler';
import { ModifyExercisePopupComponent } from 'src/app/@popups/modify-exercise-popup/modify-exercise-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.component.html',
  styleUrls: ['./training-details.component.scss']
})
export class TrainingDetailsComponent implements OnInit {

  editMode = false; 
  onlyEditMode = false;

  training;
  trainingSessions;
  progress: any[] = [];
  bsModalRef: BsModalRef;

  progress_new: any[] = [];     //  Tymczasowa tablica dodająca ćwiczenia
  progress_mod: any[] = [];     //  Tymczasowa tablica modyfikujaca ćwiczenia
  progress_del: any[] = [];     //  Tymczasowa tablica usuwajaca ćwiczenia
  sessions_new: any[] = [];     //  Tymczasowa tablica dodająca sesje
  sessions_del: any[] = [];     //  Tymczasowa tablica usuwająca sesje

  constructor(
    private trainingSessionService: TrainingSessionService,
    private trainingSessionExcerciseService: TrainingSessionExcerciseService,
    private userProgressService: UserProgressService,
    private trainingSessionExerciseService: TrainingSessionExcerciseService,
    private modalService: BsModalService,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.initialize()
  }

  private initialize(): void {
    this.training = history.state.training
    this.trainingSessions = history.state.sessions
    this.progress = history.state.progress
    this.onlyEditMode = history.state.onlyEditMode;
    if(this.onlyEditMode) this.editMode = true;
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
    if(this.editMode == false){
      if(userProgress.progress == 1) userProgress.progress = 0
      else userProgress.progress = 1
      this.userProgressService.updateUserProgress(userProgress).subscribe(response => console.log(response));
    }
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
          console.log(list[0]);
          if(list[0] != undefined){
            if (list[0]['trainingSessionExercise']['trainingSession']['id'] == sessionObject.id) {
              orderNumberLatest = list.length + 1;
            }
          }
          else{
            orderNumberLatest = 1;
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

        this.progress[sessionObject.orderNumber - 1].push(new_progress);

        this.progress_new.push(new_progress);

        console.log(this.trainingSessions);
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
      

      const index1 = this.progress_new.indexOf(item, 0);
      if (index1 > -1) {
        this.progress_new.splice(index1, 1);
      }

      const index2 = this.progress[sessionObject.orderNumber - 1].indexOf(item, 0);
      if (index2 > -1) {
        this.progress[sessionObject.orderNumber - 1].splice(index2, 1);
      }
    } else {


      this.progress_del.push(item);

      const index1 = this.progress[sessionObject.orderNumber - 1].indexOf(item, 0);
      if (index1 > -1) {
        this.progress[sessionObject.orderNumber - 1].splice(index1, 1);
      }

      const index2 = this.progress_mod.indexOf(item, 0);
      if (index2 > -1) {
        this.progress_mod.splice(index2, 1);
      }

    }
  }

  delSession(sessionObject): void {

    if ( this.sessions_new.indexOf( sessionObject ) > -1){

      const index = this.sessions_new.indexOf(sessionObject, 0);
      if (index > -1) {
        this.sessions_new.splice(index, 1);
      }

      const index1 = this.trainingSessions.indexOf(sessionObject, 0);
      if (index1 > -1) {
        this.trainingSessions.splice(index1, 1);
      }

      for(let item of this.progress[sessionObject.orderNumber - 1]){
        console.log(item);
        this.delExercise(sessionObject, item);
      }

      const index2 = sessionObject.orderNumber - 1;
      if (index2 > -1) {
        this.progress.splice(index2, 1);
      }

    } else {

      const index = this.trainingSessions.indexOf(sessionObject, 0);
      if (index > -1) {
        this.trainingSessions.splice(index, 1);
      }
      this.sessions_del.push(sessionObject);

      while(this.progress[sessionObject.orderNumber - 1].length > 0){
        this.delExercise(sessionObject, this.progress[sessionObject.orderNumber - 1][0]);
      }

      const index2 = sessionObject.orderNumber - 1;
      if (index2 > -1) {
        this.progress.splice(index2, 1);
      }

    }
  }

  addTrainingSessionPopupOpen() : void{
    this.bsModalRef = this.modalService.show(AddTrainingSessionPopupComponent);
    this.bsModalRef.content.onClose.subscribe(response => {
      if(response){
        this.bsModalRef.content.nazwa

        let newSession = {
          trainingPlan: this.training,
          name: this.bsModalRef.content.nazwa,
          orderNumber: this.trainingSessions.length + 1
        }

        this.trainingSessions.push(newSession);
        this.sessions_new.push(newSession);

        this.progress.push([]);

        let sessionExerciseLatestId = 1
        let exerciseLatestId = 1;

        for (let list of this.progress) {
          for (let prog of list){
            if (sessionExerciseLatestId <= prog['trainingSessionExercise']['id']) {
              sessionExerciseLatestId = prog['trainingSessionExercise']['id'] + 1;
            }
            if (exerciseLatestId <= prog['trainingSessionExercise']['exercise']['id']) {
              exerciseLatestId = prog['trainingSessionExercise']['exercise']['id'] + 1;
            }
          }
        }

        // utworzenie nowego obiektu

        let new_progress = {
          user: {
            login: localStorage.getItem('userLogin')
          },
          trainingSessionExercise: {
            id: sessionExerciseLatestId,
            exercise: {
              name: 'przykład',
              sets: 1,
              reps: 1
            },
            trainingSession: this.trainingSessions[this.trainingSessions.length - 1],
            orderNumber: 1
          },
          progress: 0

        };

        // Dodanie referencji na nowo utworzony obiekt do progress i progress_new

        this.progress[this.trainingSessions[this.trainingSessions.length - 1]['orderNumber'] - 1].push(new_progress);

        this.progress_new.push(new_progress);

        console.log(this.trainingSessions);
        console.log(this.progress);
        console.log(this.progress_new);
      }
    });
    
  }

  enableEditMode(): void{
    this.editMode = true;
  }

  cancel() : void{
    if(this.onlyEditMode) this.router.navigate(['/pages/administration'])
    else this.editMode = false;

    var responses = 0;
    this.progress = [];
    this.trainingSessionService.getTrainingSessions(this.training.id).subscribe(response =>{ 
      this.trainingSessions = response;
      for(var i=0;i<this.trainingSessions.length;i++){
        this.userProgressService.getTrainingSessionProgress(this.trainingSessions[i].id).subscribe( 
          response => {
            responses++;
            this.progress.push(response)
            if(responses == this.trainingSessions.length){
              this.progress = this.progress.sort((p1, p2) => {
                if(p1[0].trainingSessionExercise.trainingSession.orderNumber > p2[0].trainingSessionExercise.trainingSession.orderNumber){
                  return 1;
                }
                if(p1[0].trainingSessionExercise.trainingSession.orderNumber < p2[0].trainingSessionExercise.trainingSession.orderNumber){
                  return -1;
                }
                return 0;
              });
            }
          }
        )
      }
    })
  }

  save() : void{
    if(!this.onlyEditMode) this.editMode = false;
    this.trainingSessionService.addTrainingSessions(this.sessions_new).subscribe(response => {
      this.trainingSessionExerciseService.addTrainingSessionExercises(this.progress_new).subscribe(response => {
      });
      this.trainingSessionExerciseService.updateTrainingSessionExercises(this.progress_mod).subscribe(response => {
      });
      this.trainingSessionExerciseService.deleteTrainingSessionExercises(this.progress_del).subscribe(response => {
        this.trainingSessionService.deleteTrainingSessions(this.sessions_del).subscribe(response => {
          if(this.onlyEditMode) this.router.navigate(['/pages/administration']);
        })
      });
    })
  }
}
