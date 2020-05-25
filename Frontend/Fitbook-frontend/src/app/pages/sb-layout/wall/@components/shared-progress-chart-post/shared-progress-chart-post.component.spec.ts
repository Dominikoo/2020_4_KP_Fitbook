import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedProgressChartPostComponent } from './shared-progress-chart-post.component';

describe('SharedProgressChartPostComponent', () => {
  let component: SharedProgressChartPostComponent;
  let fixture: ComponentFixture<SharedProgressChartPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedProgressChartPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedProgressChartPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
