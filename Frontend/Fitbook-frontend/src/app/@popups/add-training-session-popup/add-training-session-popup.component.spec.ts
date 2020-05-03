import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingSessionPopupComponent } from './add-training-session-popup.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddTrainingSessionPopupComponent', () => {
  let component: AddTrainingSessionPopupComponent;
  let fixture: ComponentFixture<AddTrainingSessionPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ AddTrainingSessionPopupComponent ],
      providers: [
        BsModalRef,
        BsModalService,
        BsLocaleService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingSessionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set onClose to true', (done) => {
    component.onClose.subscribe(response => {
      expect(response).toEqual(true);
      done();
    })
    component.onConfirm();
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
    fixture.detectChanges();
    component.form.controls.name.markAsTouched();
    component.form.controls.name.setValue('xxx');
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

  it('name should be invalid', async(() => {
    fixture.detectChanges();
    component.form.controls.name.markAsTouched();
    component.form.controls.name.setValue('');
    fixture.detectChanges();

    expect(component.form.controls.name.valid).toBeFalse();
  }));
});
