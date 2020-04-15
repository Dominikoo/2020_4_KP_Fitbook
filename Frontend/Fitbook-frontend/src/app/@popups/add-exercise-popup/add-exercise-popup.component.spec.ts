import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExercisePopupComponent } from './add-exercise-popup.component';

describe('AddExercisePopupComponent', () => {
  let component: AddExercisePopupComponent;
  let fixture: ComponentFixture<AddExercisePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExercisePopupComponent ]
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
});
