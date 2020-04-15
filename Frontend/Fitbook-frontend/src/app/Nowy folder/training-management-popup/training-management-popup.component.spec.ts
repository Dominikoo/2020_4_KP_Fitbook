import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingManagementPopupComponent } from './training-management-popup.component';

describe('TrainingManagementPopupComponent', () => {
  let component: TrainingManagementPopupComponent;
  let fixture: ComponentFixture<TrainingManagementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingManagementPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingManagementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
