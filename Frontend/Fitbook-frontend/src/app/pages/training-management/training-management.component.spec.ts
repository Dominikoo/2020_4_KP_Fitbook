import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingManagementComponent } from './training-management.component';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('TrainingManagementComponent', () => {
  let component: TrainingManagementComponent;
  let fixture: ComponentFixture<TrainingManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ TrainingManagementComponent ],
      providers: [
        FormBuilder,
        BsModalService,
        BsModalRef,
        ComponentLoaderFactory,
        PositioningService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
