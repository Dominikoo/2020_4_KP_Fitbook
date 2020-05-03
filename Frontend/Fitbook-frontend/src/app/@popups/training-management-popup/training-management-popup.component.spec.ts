import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingManagementPopupComponent } from './training-management-popup.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

describe('TrainingManagementPopupComponent', () => {
  let component: TrainingManagementPopupComponent;
  let fixture: ComponentFixture<TrainingManagementPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ TrainingManagementPopupComponent ],
      providers: [
        BsModalService,
        BsModalRef,
        BsLocaleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingManagementPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
