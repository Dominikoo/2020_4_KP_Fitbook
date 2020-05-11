import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementComponent } from './account-management.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('AccountManagementComponent', () => {
  let component: AccountManagementComponent;
  let fixture: ComponentFixture<AccountManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ AccountManagementComponent ],
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
    fixture = TestBed.createComponent(AccountManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call savePassword method', () => {
    fixture.detectChanges();
    spyOn(component, 'openPasswordPopup');

    let el = fixture.debugElement.query(By.css('#password-button')).nativeElement;
    el.click();
    expect(component.openPasswordPopup).toHaveBeenCalledTimes(1);
  });

  it('should call saveChanges method', () => {
    fixture.detectChanges();
    spyOn(component, 'saveChanges');

    let el = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    el.click();
    expect(component.saveChanges).toHaveBeenCalledTimes(1);
  });

  it('isSaveSuccessful should be true after saveChanges method', () => {
    fixture.detectChanges();
    spyOn(component, 'saveChanges');

    let el = fixture.debugElement.query(By.css('#save-button')).nativeElement;
    el.click();

    fixture.whenStable().then(() => {
      expect(component.isSaveSuccesful).toBeTrue();
    })
    expect(component.saveChanges).toHaveBeenCalledTimes(1);
    
  });
});
