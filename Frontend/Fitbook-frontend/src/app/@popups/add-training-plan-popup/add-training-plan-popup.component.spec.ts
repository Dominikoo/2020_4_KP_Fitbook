import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { AddTrainingPlanPopupComponent } from './add-training-plan-popup.component';
import { By } from '@angular/platform-browser';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UserTrainingManagementComponent } from 'src/app/pages/user-training-management/user-training-management.component';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { AddTrainingSessionPopupComponent } from '../add-training-session-popup/add-training-session-popup.component';

describe('AddTrainingPlanPopupComponent', () => {
  let component: UserTrainingManagementComponent;
  // let component2: UserTrainingManagementComponent;

  let fixture: ComponentFixture<UserTrainingManagementComponent>;
  let fixture2: ComponentFixture<AddTrainingPlanPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ AddTrainingPlanPopupComponent ],
      providers: [
        BsModalRef,
        BsModalService,
        BsLocaleService,
        ComponentLoaderFactory,
        PositioningService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrainingManagementComponent);
    fixture2 = TestBed.createComponent(AddTrainingPlanPopupComponent);

    // component2 = fixture2.componentInstance;
    component = fixture.componentInstance
    component.trainingDiffs = ['xxx'];
    component.trainingIntensities = ['xxx'];
    component.trainingLengths = ['xxx'];
    component.trainingTypes = ['xxx'];
    component.addTrainingPlanPopupOpen();
    // const bsModalService = getTestBed().get(BsModalService);

    // const initialState = {trainingDiffs: ['xxx', 'xxx2'],
    //   trainingLengths: ['xxx'],
    //   trainingIntensities: ['xxx'],
    //   trainingTypes: ['xxx'],
    //   trainingPlan: {
    //     id: null,
    //     name: '',
    //     description: '',
    //     trainingType: null,
    //     trainingLength: null,
    //     trainingIntensity: null,
    //     trainingDifficulty: null
    //   }}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.bsModalRef).toBeTruthy();
  });

  it('should set onClose to true', (done) => {
    component.bsModalRef.content.onClose.subscribe(response => {
      expect(response).toEqual(true);
      done();
    })
    component.bsModalRef.content.onConfirm();
  });

  it('should set onClose to false', (done) => {
    component.bsModalRef.content.onClose.subscribe(response => {
      expect(response).toEqual(false);
      done();
    })
    component.bsModalRef.content.onCancel();
  });

  it('shouldn\'t call the onConfirm method while disabled', async(() => {
    fixture.detectChanges();

    spyOn(component.bsModalRef.content, 'onConfirm');

    let el = fixture2.debugElement.query(By.css('.confirm-button')).nativeElement;
    el.click();

    expect(component.bsModalRef.content.onConfirm).toHaveBeenCalledTimes(0);
  }));

  it('should call the onConfirm method', async(() => {
    fixture.detectChanges();
    component.bsModalRef.content.form.controls.name.markAsTouched();
    component.bsModalRef.content.form.controls.name.setValue('xxx');
    component.bsModalRef.content.form.controls.description.setValue('xxx');
    fixture.detectChanges();
    spyOn(component.bsModalRef.content, 'onConfirm');

    let el = fixture2.debugElement.query(By.css('.confirm-button')).nativeElement;
    el.click();

    expect(component.bsModalRef.content.onConfirm).toHaveBeenCalledTimes(1);
  }));

  it('should call the onCancel method', async(() => {
    fixture.detectChanges();
    spyOn(component.bsModalRef.content, 'onCancel');

    let el = fixture2.debugElement.queryAll(By.css('.cancel-button'));
    el.forEach(element => {
      element.nativeElement.click()
    });

    expect(component.bsModalRef.content.onCancel).toHaveBeenCalledTimes(2);
  }));

  it('name should be invalid', async(() => {
    fixture.detectChanges();
    component.bsModalRef.content.form.controls.name.markAsTouched();
    component.bsModalRef.content.form.controls.name.setValue('');
    fixture.detectChanges();

    expect(component.bsModalRef.content.form.controls.name.valid).toBeFalse();
  }));

  it('description should be invalid', async(() => {
    fixture.detectChanges();
    component.bsModalRef.content.form.controls.description.markAsTouched();
    component.bsModalRef.content.form.controls.description.setValue('');
    fixture.detectChanges();

    expect(component.bsModalRef.content.form.controls.description.valid).toBeFalse();
  }));

  
});
