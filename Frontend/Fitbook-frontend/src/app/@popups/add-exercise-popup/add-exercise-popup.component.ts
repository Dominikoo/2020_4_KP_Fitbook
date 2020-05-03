import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { TrainingSessionExcerciseService } from 'src/app/services/training.session.exercise.service';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-exercise-popup',
  templateUrl: './add-exercise-popup.component.html',
  styleUrls: ['./add-exercise-popup.component.scss']
})
export class AddExercisePopupComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    reps: new FormControl(1, [Validators.required, Validators.min(1)]),
    sets: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  public onClose: Subject<boolean>;

  sessionId: string;

  newExercise = {
    name: '',
    reps: 1,
    sets: 1,
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
    this.newExercise = this.form.value;
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
