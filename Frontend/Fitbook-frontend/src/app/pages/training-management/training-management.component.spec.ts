import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingManagementComponent } from './training-management.component';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TrainingManagementComponent', () => {
  let component: TrainingManagementComponent;
  let fixture: ComponentFixture<TrainingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingManagementComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        FormBuilder
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
