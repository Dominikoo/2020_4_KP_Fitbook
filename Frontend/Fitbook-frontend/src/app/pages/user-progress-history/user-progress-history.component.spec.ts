import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgressHistoryComponent } from './user-progress-history.component';

describe('UserProgressHistoryComponent', () => {
  let component: UserProgressHistoryComponent;
  let fixture: ComponentFixture<UserProgressHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProgressHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgressHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
