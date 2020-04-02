import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrainingManagementComponent } from './user-training-management.component';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

describe('UserTrainingManagementComponent', () => {
  let component: UserTrainingManagementComponent;
  let fixture: ComponentFixture<UserTrainingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTrainingManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTrainingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
