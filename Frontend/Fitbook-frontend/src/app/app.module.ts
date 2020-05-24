import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { plLocale } from 'ngx-bootstrap/locale';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddExercisePopupComponent } from './@popups/add-exercise-popup/add-exercise-popup.component';
import { AddTrainingPlanPopupComponent } from './@popups/add-training-plan-popup/add-training-plan-popup.component';
import { ModifyExercisePopupComponent } from './@popups/modify-exercise-popup/modify-exercise-popup.component';
import { AddTrainingSessionPopupComponent } from './@popups/add-training-session-popup/add-training-session-popup.component';
import { AddWeightPopupComponent } from './@popups/add-weight-popup/add-weight-popup.component';
import { ChangePasswordPopupComponent } from './@popups/change-password-popup/change-password-popup.component';
import { ConfirmDeletePopupComponent } from './@popups/confirm-delete-popup/confirm-delete-popup.component';
import { TrainingAddedInfoPopupComponent } from './@popups/training-added-info-popup/training-added-info-popup.component';
import { ShareTrainingPlanPopupComponent } from './@popups/share-training-plan-popup/share-training-plan-popup.component';
import { ShareUserWeightPopupComponent } from './@popups/share-user-weight-popup/share-user-weight-popup.component';
defineLocale('pl', plLocale);

@NgModule({
  declarations: [
    AppComponent,
    AddExercisePopupComponent,
    AddTrainingPlanPopupComponent,
    ModifyExercisePopupComponent,
    AddTrainingSessionPopupComponent,
    AddWeightPopupComponent,
    ConfirmDeletePopupComponent,
    TrainingAddedInfoPopupComponent,
    ChangePasswordPopupComponent,
    ShareTrainingPlanPopupComponent,
    ShareUserWeightPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
