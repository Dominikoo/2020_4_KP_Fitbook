import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedWeightChartPostComponent } from './shared-weight-chart-post.component';

describe('SharedWeightChartPostComponent', () => {
  let component: SharedWeightChartPostComponent;
  let fixture: ComponentFixture<SharedWeightChartPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedWeightChartPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedWeightChartPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
