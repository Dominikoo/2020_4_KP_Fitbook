import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { plLocale } from 'ngx-bootstrap/locale';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TrainingManagementPopupComponent } from './@popups/training-management-popup/training-management-popup.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddExercisePopupComponent } from './@popups/add-exercise-popup/add-exercise-popup.component';
import { AddTrainingPlanPopupComponent } from './@popups/add-training-plan-popup/add-training-plan-popup.component';
defineLocale('pl', plLocale);

@NgModule({
  declarations: [
    AppComponent,
    TrainingManagementPopupComponent,
    AddExercisePopupComponent,
    AddTrainingPlanPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
