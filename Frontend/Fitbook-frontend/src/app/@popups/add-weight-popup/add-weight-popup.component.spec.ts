import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightPopupComponent } from './add-weight-popup.component';
import { By } from '@angular/platform-browser';
import { FormBuilder, FormsModule } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddWeightPopupComponent', () => {
  let component: AddWeightPopupComponent;
  let fixture: ComponentFixture<AddWeightPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [ AddWeightPopupComponent ],
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
    fixture = TestBed.createComponent(AddWeightPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
