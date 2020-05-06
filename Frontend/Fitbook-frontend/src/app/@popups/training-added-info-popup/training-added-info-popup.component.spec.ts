import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAddedInfoPopupComponent } from './training-added-info-popup.component';

describe('TrainingAddedInfoPopupComponent', () => {
  let component: TrainingAddedInfoPopupComponent;
  let fixture: ComponentFixture<TrainingAddedInfoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAddedInfoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAddedInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
