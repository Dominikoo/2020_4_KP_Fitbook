import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainingManagementComponent } from './user-training-management.component';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';


describe('UserTrainingManagementComponent', () => {
  let component: UserTrainingManagementComponent;
  let fixture: ComponentFixture<UserTrainingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      declarations: [ UserTrainingManagementComponent ],
      providers: [
        BsModalService,
        ComponentLoaderFactory,
        PositioningService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrainingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('userLogin', 'login1');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submit method', () => {
    fixture.detectChanges();
    spyOn(component, 'submit');

    let el = fixture.debugElement.query(By.css('#submit-button')).nativeElement;
    el.click();
    expect(component.submit).toHaveBeenCalledTimes(1);
  });
  
  it('should call addTrainingPlanPopupOpen method', () => {
    fixture.detectChanges();
    spyOn(component, 'addTrainingPlanPopupOpen');

    let el = fixture.debugElement.query(By.css('#create-training-button')).nativeElement;
    el.click();
    expect(component.addTrainingPlanPopupOpen).toHaveBeenCalledTimes(1);
  });
  
  it('should call sendTraininigInfo method', () => {
    fixture.detectChanges();
    spyOn(component, 'sendTraininigInfo');

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let de = fixture.debugElement.queryAll(By.css('.train-button'));
      console.log(de);
      let el = fixture.debugElement.query(By.css('.retrain-button')).nativeElement;
      el.click();
      console.log(el)
      expect(component.sendTraininigInfo).toHaveBeenCalledTimes(9);
    })
  });

});
