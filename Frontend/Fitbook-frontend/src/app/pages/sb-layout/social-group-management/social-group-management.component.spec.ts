import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialGroupManagementComponent } from './social-group-management.component';

describe('SocialGroupManagementComponent', () => {
  let component: SocialGroupManagementComponent;
  let fixture: ComponentFixture<SocialGroupManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialGroupManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
