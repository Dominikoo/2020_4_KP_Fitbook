import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { TrainingSessionExcerciseService } from 'src/app/services/training.session.exercise.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-exercise-popup',
  templateUrl: './add-exercise-popup.component.html',
  styleUrls: ['./add-exercise-popup.component.scss']
})
export class AddExercisePopupComponent implements OnInit {

  public onClose: Subject<boolean>;

  sessionId: string;

  newExercise = {
    name: '',
    reps: '',
    sets: '',
  }

  id: string;
  date: Date = new Date();
  comment = '';

  constructor(
    public bsModalRef: BsModalRef,
    private localeService: BsLocaleService,
    private service: TrainingSessionExcerciseService,
    private router: Router
    ) { }

  ngOnInit() {
    this.localeService.use('pl');
    this.onClose = new Subject();
  }

  onConfirm() {
    this.onClose.next(true);
    this.bsModalRef.hide()
    // this.service.addTrainingSessionExercise(this.newExercise, this.sessionId).subscribe(response => {
    //   this.bsModalRef.hide();
    //   //this.router.navigate(['/list']);
    // });
  }

  onCancel() {
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}
