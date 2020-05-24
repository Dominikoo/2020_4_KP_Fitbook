import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareUserWeightPopupComponent } from './share-user-weight-popup.component';

describe('ShareUserWeightPopupComponent', () => {
  let component: ShareUserWeightPopupComponent;
  let fixture: ComponentFixture<ShareUserWeightPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareUserWeightPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareUserWeightPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
