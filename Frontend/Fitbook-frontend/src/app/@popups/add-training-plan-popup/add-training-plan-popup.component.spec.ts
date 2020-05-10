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
import { TrainingPlanService } from 'src/app/services/training.plan.service';
import { AddTrainingSessionPopupComponent } from '../add-training-session-popup/add-training-session-popup.component';
import { Observable, of } from 'rxjs';

describe('AddTrainingPlanPopupComponent', () => {
  let component: AddTrainingPlanPopupComponent;

  let fixture: ComponentFixture<AddTrainingPlanPopupComponent>;

  let injectedService: TrainingPlanService;


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
        PositioningService,
        TrainingPlanService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingPlanPopupComponent);
    component = fixture.componentInstance;

    component.trainingPlan = {
      id: null,
      name: '',
      description: '',
      trainingType: null,
      trainingLength: null,
      trainingIntensity: null,
      trainingDifficulty: null,
      isPrivate: true
    }
    component.trainingIntensities = ['xxx'];
    component.trainingDiffs = ['xxx'];
    component.trainingLengths = ['xxx'];
    component.trainingTypes = ['xxx'];

    injectedService = component['trainingPlanService'];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.bsModalRef).toBeTruthy();
  });

  it('should set onClose to true', async(() => {
    
    spyOn(component.bsModalRef, 'hide');
    spyOn(injectedService, 'postTrainingPlan').and.returnValue(of(1));

    component.onConfirm();
    
    fixture.detectChanges();

    expect(component.bsModalRef.hide).toHaveBeenCalled();
  }));

  it('should set onClose to true', (done) => {
    
    spyOn(injectedService, 'postTrainingPlan').and.returnValue(of(1));
    fixture.detectChanges();

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
    component.form.controls.description.setValue('xxx');
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

  it('description should be invalid', async(() => {
    fixture.detectChanges();
    component.form.controls.description.markAsTouched();
    component.form.controls.description.setValue('');
    fixture.detectChanges();

    expect(component.form.controls.description.valid).toBeFalse();
  }));

  it('should call the service function after calling onConfirm', async(() => {

    spyOn(injectedService, 'postTrainingPlan').and.returnValue(of(1));

    component.onConfirm();

    expect(injectedService.postTrainingPlan).toHaveBeenCalledWith(component.trainingPlan, localStorage.getItem('userLogin'));
  }));
  
});
