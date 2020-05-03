import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [RegisterComponent],
      providers: [
        HttpClient,
        HttpHandler
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the signUp method', async(() => {
    fixture.detectChanges();
    spyOn(component, 'signUp');

    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.signUp).toHaveBeenCalledTimes(0);
  }));

  it('login control should be invalid', async(() => {
    fixture.detectChanges();
    component.form.controls.login.markAsTouched();
    fixture.detectChanges();
    expect(!!component.form.controls.login.invalid).toBeTrue();
  }));

  it('login control should be at least 6 chars long', async(() => {
    fixture.detectChanges();
    component.form.controls.login.markAsTouched();
    component.form.controls.login.setValue('xxxxx');
    fixture.detectChanges();
    expect(!!component.form.controls.login.invalid).toBeTrue;
    component.form.controls.login.setValue('xxxxxx');
    fixture.detectChanges();
    expect(!!component.form.controls.login.valid).toBeTrue;
  }));

  it('email control should be invalid', async(() => {
    fixture.detectChanges();
    component.form.controls.email.markAsTouched();
    fixture.detectChanges();
    expect(!!component.form.controls.email.invalid).toBeTrue();
  }));

  it('password control should be invalid', async(() => {
    fixture.detectChanges();
    component.form.controls.password.markAsTouched();
    fixture.detectChanges();
    expect(!!component.form.controls.password.invalid).toBeTrue();
  }));

  it('password control should be at least 6 chars long', async(() => {
    fixture.detectChanges();
    component.form.controls.password.markAsTouched();
    component.form.controls.password.setValue('xxxxx');
    fixture.detectChanges();
    expect(!!component.form.controls.password.invalid).toBeTrue;
    component.form.controls.login.setValue('xxxxxx');
    fixture.detectChanges();
    expect(!!component.form.controls.password.valid).toBeTrue;
  }));

});
