import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingSessionPopupComponent } from './add-training-session-popup.component';

describe('AddTrainingSessionPopupComponent', () => {
  let component: AddTrainingSessionPopupComponent;
  let fixture: ComponentFixture<AddTrainingSessionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainingSessionPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingSessionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
