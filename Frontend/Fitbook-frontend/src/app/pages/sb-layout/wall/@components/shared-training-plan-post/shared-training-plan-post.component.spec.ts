import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedTrainingPlanPostComponent } from './shared-training-plan-post.component';

describe('SharedTrainingPlanPostComponent', () => {
  let component: SharedTrainingPlanPostComponent;
  let fixture: ComponentFixture<SharedTrainingPlanPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedTrainingPlanPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedTrainingPlanPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
