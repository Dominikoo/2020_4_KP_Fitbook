import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingPlanPopupComponent } from './add-training-plan-popup.component';

describe('AddTrainingPlanPopupComponent', () => {
  let component: AddTrainingPlanPopupComponent;
  let fixture: ComponentFixture<AddTrainingPlanPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainingPlanPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingPlanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
