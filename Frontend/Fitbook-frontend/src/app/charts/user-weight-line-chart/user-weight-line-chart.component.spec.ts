import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWeightLineChartComponent } from './user-weight-line-chart.component';

describe('UserWeightLineChartComponent', () => {
  let component: UserWeightLineChartComponent;
  let fixture: ComponentFixture<UserWeightLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserWeightLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWeightLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
