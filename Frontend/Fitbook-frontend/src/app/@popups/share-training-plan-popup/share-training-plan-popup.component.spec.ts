import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareTrainingPlanPopupComponent } from './share-training-plan-popup.component';

describe('ShareTrainingPlanPopupComponent', () => {
  let component: ShareTrainingPlanPopupComponent;
  let fixture: ComponentFixture<ShareTrainingPlanPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareTrainingPlanPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareTrainingPlanPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
