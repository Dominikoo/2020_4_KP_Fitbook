import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AddExercisePopupComponent } from './add-exercise-popup.component';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AddExercisePopupComponent', () => {
  let component: AddExercisePopupComponent;
  let fixture: ComponentFixture<AddExercisePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ AddExercisePopupComponent ],
      providers: [
        BsModalRef,
        BsLocaleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExercisePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', async(() => {
    component.onConfirm();
    expect(component.onClose).toBeTruthy();
  }));

  it('shouldn\'t call the onConfirm method while disabled', async(() => {
    fixture.detectChanges();

    spyOn(component, 'onConfirm');

    let el = fixture.debugElement.query(By.css('#confirm-button')).nativeElement;
    el.click();

    expect(component.onConfirm).toHaveBeenCalledTimes(0);
  }));

  it('should call the onConfirm method', async(() => {
    fixture.detectChanges();
    component.form.controls.name.markAsTouched();
    component.form.controls.name.setValue('xxx');
    component.form.controls.sets.setValue(1);
    component.form.controls.reps.setValue(1);
    fixture.detectChanges();
    spyOn(component, 'onConfirm');

    let el = fixture.debugElement.query(By.css('#confirm-button')).nativeElement;
    el.click();

    expect(component.onConfirm).toHaveBeenCalledTimes(1);
  }));

  it('should call the onCancel method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onCancel');

    let el = fixture.debugElement.queryAll(By.css('.cancel-button'));
    el.forEach(element => {
      element.nativeElement.click()
    });

    expect(component.onCancel).toHaveBeenCalledTimes(2);
  }));

  it('name should be invalid', async(() => {
    fixture.detectChanges();
    component.form.controls.name.markAsTouched();
    component.form.controls.name.setValue('');
    fixture.detectChanges();

    expect(component.form.controls.name.valid).toBeFalse();
  }));

  it('sets should be invalid', async(() => {
    fixture.detectChanges();
    component.form.controls.sets.markAsTouched();
    component.form.controls.sets.setValue('');
    fixture.detectChanges();

    expect(component.form.controls.sets.valid).toBeFalse();
  }));

  it('sets should be greater than 0', async(() => {
    fixture.detectChanges();
    component.form.controls.sets.markAsTouched();
    component.form.controls.sets.setValue(0);
    fixture.detectChanges();

    expect(component.form.controls.sets.valid).toBeFalse();
  }));

  it('reps should be invalid', async(() => {
    fixture.detectChanges();
    component.form.controls.reps.markAsTouched();
    component.form.controls.reps.setValue('');
    fixture.detectChanges();

    expect(component.form.controls.reps.valid).toBeFalse();
  }));

  it('reps should be greater than 0', async(() => {
    fixture.detectChanges();
    component.form.controls.reps.markAsTouched();
    component.form.controls.reps.setValue(0);
    fixture.detectChanges();

    expect(component.form.controls.reps.valid).toBeFalse();
  }));
});
