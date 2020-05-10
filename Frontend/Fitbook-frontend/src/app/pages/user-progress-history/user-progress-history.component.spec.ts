import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProgressHistoryComponent } from './user-progress-history.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('UserProgressHistoryComponent', () => {
  let component: UserProgressHistoryComponent;
  let fixture: ComponentFixture<UserProgressHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ UserProgressHistoryComponent ],
      providers: [
        BsModalService,
        BsModalRef,
        ComponentLoaderFactory,
        PositioningService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProgressHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
