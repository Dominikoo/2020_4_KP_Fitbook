import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightPopupComponent } from './add-weight-popup.component';

describe('AddWeightPopupComponent', () => {
  let component: AddWeightPopupComponent;
  let fixture: ComponentFixture<AddWeightPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWeightPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWeightPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
