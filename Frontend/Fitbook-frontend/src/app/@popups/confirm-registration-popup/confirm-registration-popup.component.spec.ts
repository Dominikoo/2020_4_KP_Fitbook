import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegistrationPopupComponent } from './confirm-registration-popup.component';

describe('ConfirmRegistrationPopupComponent', () => {
  let component: ConfirmRegistrationPopupComponent;
  let fixture: ComponentFixture<ConfirmRegistrationPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRegistrationPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRegistrationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
