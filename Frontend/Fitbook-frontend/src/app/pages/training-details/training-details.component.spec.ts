import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDetailsComponent } from './training-details.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('TrainingDetailsComponent', () => {
  let component: TrainingDetailsComponent;
  let fixture: ComponentFixture<TrainingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ TrainingDetailsComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        BsModalService,
        ComponentLoaderFactory
        // PositioningService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // window.history.pushState({ training: '0' }, '', '');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
