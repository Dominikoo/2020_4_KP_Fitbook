import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyExercisePopupComponent } from './modify-exercise-popup.component';
import { By } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModifyExercisePopupComponent', () => {
  let component: ModifyExercisePopupComponent;
  let fixture: ComponentFixture<ModifyExercisePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ ModifyExercisePopupComponent ],
      providers: [
        BsModalRef,
        BsModalService,
        BsLocaleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyExercisePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set onClose to true', (done) => {
    component.onClose.subscribe(response => {
      expect(response).toEqual(true);
      done();
    })
    component.onConfirm();
  });

  it('should set onClose to false', (done) => {
    component.onClose.subscribe(response => {
      expect(response).toEqual(false);
      done();
    })
    component.onCancel();
  });

  it('shouldn\'t call the onConfirm method while disabled', async(() => {
    fixture.detectChanges();

    spyOn(component, 'onConfirm');

    let el = fixture.debugElement.query(By.css('.confirm-button')).nativeElement;
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

    let el = fixture.debugElement.query(By.css('.confirm-button')).nativeElement;
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
