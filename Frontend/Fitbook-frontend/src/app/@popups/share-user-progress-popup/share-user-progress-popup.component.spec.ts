import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareUserProgressPopupComponent } from './share-user-progress-popup.component';

describe('ShareUserProgressPopupComponent', () => {
  let component: ShareUserProgressPopupComponent;
  let fixture: ComponentFixture<ShareUserProgressPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareUserProgressPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareUserProgressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
