import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SbLayoutComponent } from './sb-layout.component';

describe('SbLayoutComponent', () => {
  let component: SbLayoutComponent;
  let fixture: ComponentFixture<SbLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SbLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SbLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
