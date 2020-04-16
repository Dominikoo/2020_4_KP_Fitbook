import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyExercisePopupComponent } from './modify-exercise-popup.component';

describe('ModifyExercisePopupComponent', () => {
  let component: ModifyExercisePopupComponent;
  let fixture: ComponentFixture<ModifyExercisePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyExercisePopupComponent ]
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
});
