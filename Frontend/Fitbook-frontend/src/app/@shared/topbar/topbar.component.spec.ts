import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ TopbarComponent ],
      providers: [

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show admin dropdown', () => {
    fixture.detectChanges();
    localStorage.setItem('token', '123456');
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('#admin-dropdown'));
    expect(de).toBeFalsy();
    localStorage.setItem('token', '');
  });

  it('should show admin dropdown', () => {
    fixture.detectChanges();
    localStorage.setItem('token', '123456');
    localStorage.setItem('isAdmin', 'true');
    fixture.detectChanges();
    let de = fixture.debugElement.query(By.css('#admin-dropdown'));
    expect(de).toBeTruthy();
    localStorage.setItem('isAdmin', 'false');
    localStorage.setItem('token', '');
  });

  it('should show topbar details', () => {
    fixture.detectChanges();
    localStorage.setItem('token', '123456');
    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('.details'));
    expect(de.length).toBeGreaterThanOrEqual(1);
    localStorage.setItem('token', '');
  });

  it('should not show topbar details', () => {
    fixture.detectChanges();
    let de = fixture.debugElement.queryAll(By.css('.details'));
    expect(de.length).toEqual(0);
  });

  it('should call the accountManagement method', () => {
    fixture.detectChanges();
    localStorage.setItem('token', '123456');
    fixture.detectChanges();

    spyOn(component, "accountManagement");
    let el = fixture.debugElement.query(By.css('#account-management')).nativeElement;
    el.click();

    expect(component.accountManagement).toHaveBeenCalled();
  });

});
