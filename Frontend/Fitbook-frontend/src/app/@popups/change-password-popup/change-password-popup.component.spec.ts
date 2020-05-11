import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { ChangePasswordPopupComponent } from './change-password-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';

describe('ChangePasswordPopupComponent', () => {
  let component: ChangePasswordPopupComponent;

  let fixture: ComponentFixture<ChangePasswordPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule
      ],
      declarations: [ ChangePasswordPopupComponent ],
      providers: [
        BsModalRef,
        BsModalService,
        BsLocaleService,
        ComponentLoaderFactory,
        PositioningService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordPopupComponent);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set onClose to false', (done) => {
    component.onClose.subscribe(response => {
      expect(response).toEqual(false);
      done();
    })
    component.onCancel();
  });

  it('shouldn\'t call the onConfirm method while disabled', async(() => {
    fixture.detectChanges();

    spyOn(component, 'onConfirm');

    let el = fixture.debugElement.query(By.css('.confirm-button')).nativeElement;
    el.click();

    expect(component.onConfirm).toHaveBeenCalledTimes(0);
  }));

  it('should call the onConfirm method', async(() => {
    component.form.controls.password.markAsTouched();
    component.form.controls.password.setValue('haslo1');
    component.form.controls.passwordConfirmation.setValue('haslo1');
    fixture.detectChanges();
    spyOn(component, 'onConfirm');

    let el = fixture.debugElement.query(By.css('.confirm-button')).nativeElement;
    el.click();

    expect(component.onConfirm).toHaveBeenCalledTimes(1);
  }));

  it('should call the onCancel method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'onCancel');

    let el = fixture.debugElement.queryAll(By.css('.cancel-button'));
    el.forEach(element => {
      element.nativeElement.click()
    });

    expect(component.onCancel).toHaveBeenCalledTimes(2);
  }));

  it('password should be invalid (required)', async(() => {
    fixture.detectChanges();
    component.form.controls.password.markAsTouched();
    component.form.controls.password.setValue('');
    fixture.detectChanges();

    expect(component.form.controls.password.valid).toBeFalse();
  }));

  it('password should be invalid (shorter than 6 characters)', async(() => {
    fixture.detectChanges();
    component.form.controls.password.markAsTouched();
    component.form.controls.password.setValue('xxxxx');
    fixture.detectChanges();

    expect(component.form.controls.password.valid).toBeFalse();
  }));

  it('password should be valid (valid length and not equal earlier password)', async(() => {
    fixture.detectChanges();
    component.form.controls.password.markAsTouched();
    component.form.controls.password.setValue('123456');
    // earlier password is undefined as we open popup directly not from the mother component
    fixture.detectChanges();

    expect(component.form.controls.password.valid).toBeTrue();
  }));

  it('passwordConfirmation should be invalid (required)', async(() => {
    fixture.detectChanges();
    component.form.controls.passwordConfirmation.markAsTouched();
    component.form.controls.passwordConfirmation.setValue('');
    fixture.detectChanges();

    expect(component.form.controls.passwordConfirmation.valid).toBeFalse();
  }));


  it('passwordConfirmation should be invalid (not equal password)', async(() => {
    fixture.detectChanges();
    component.form.controls.password.markAsTouched();
    component.form.controls.passwordConfirmation.markAsTouched();
    component.form.controls.password.setValue('haslo12');
    component.form.controls.passwordConfirmation.setValue('haslo123');

    fixture.detectChanges();

    expect(component.form.controls.passwordConfirmation.valid).toBeFalse();
  }));

  it('passwordConfirmation should be valid (equal password)', async(() => {
    fixture.detectChanges();
    component.form.controls.password.markAsTouched();
    component.form.controls.passwordConfirmation.markAsTouched();
    component.form.controls.password.setValue('haslo12');
    component.form.controls.passwordConfirmation.setValue('haslo12');

    fixture.detectChanges();

    expect(component.form.controls.passwordConfirmation.valid).toBeTrue();
  }));

});
