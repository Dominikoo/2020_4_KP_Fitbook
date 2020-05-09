import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingAddedInfoPopupComponent } from './training-added-info-popup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { By } from '@angular/platform-browser';

describe('TrainingAddedInfoPopupComponent', () => {
  let component: TrainingAddedInfoPopupComponent;
  let fixture: ComponentFixture<TrainingAddedInfoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ TrainingAddedInfoPopupComponent ],
      providers: [
        BsModalRef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingAddedInfoPopupComponent);
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

  it('should call the onConfirm method', async(() => {
    spyOn(component, 'onConfirm');

    let el = fixture.debugElement.query(By.css('.confirm-button')).nativeElement;
    el.click();

    expect(component.onConfirm).toHaveBeenCalledTimes(1);
  }));

  it('should call the onCancel method', async(() => {
    spyOn(component, 'onCancel');

    let el = fixture.debugElement.queryAll(By.css('.cancel-button'));
    el.forEach(element => {
      element.nativeElement.click()
    });

    expect(component.onCancel).toHaveBeenCalledTimes(2);
  }));
});
