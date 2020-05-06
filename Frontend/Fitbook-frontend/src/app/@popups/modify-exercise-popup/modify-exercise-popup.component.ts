import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';
import { TrainingSessionExcerciseService } from 'src/app/services/training.session.exercise.service';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-exercise-popup',
  templateUrl: './modify-exercise-popup.component.html',
  styleUrls: ['./modify-exercise-popup.component.scss']
})
export class ModifyExercisePopupComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    reps: new FormControl(1, [Validators.required, Validators.min(1)]),
    sets: new FormControl(1, [Validators.required, Validators.min(1)])
  });

  public onClose: Subject<boolean>;

  sessionId: string;

  exercise = {
    id: '',
    description: '',
    length_in_seconds_per_set: '',
    name: '',
    reps: '',
    sets: '',
  }

  backup_exercise = {
    id: '',
    description: '',
    length_in_seconds_per_set: '',
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
    this.backup_exercise.id = this.exercise.id;
    this.backup_exercise.description = this.exercise.description;
    this.backup_exercise.length_in_seconds_per_set = this.exercise.length_in_seconds_per_set;
    this.backup_exercise.name = this.exercise.name;
    this.backup_exercise.reps = this.exercise.reps;
    this.backup_exercise.sets = this.exercise.sets;
    this.form.controls.name.setValue(this.backup_exercise.name);
    this.form.controls.reps.setValue(this.backup_exercise.reps);
    this.form.controls.sets.setValue(this.backup_exercise.sets);
  }

  onConfirm() {
    this.exercise.name = this.form.controls.name.value;
    this.exercise.reps = this.form.controls.reps.value;
    this.exercise.sets = this.form.controls.sets.value;
    this.onClose.next(true);
    this.bsModalRef.hide()
  }

  onCancel() {
    this.exercise.id = this.backup_exercise.id;
    this.exercise.description = this.backup_exercise.description;
    this.exercise.length_in_seconds_per_set = this.backup_exercise.length_in_seconds_per_set;
    this.exercise.name = this.backup_exercise.name;
    this.exercise.reps = this.backup_exercise.reps;
    this.exercise.sets = this.backup_exercise.sets;
    this.onClose.next(false);
    this.bsModalRef.hide();
  }
}