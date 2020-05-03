import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { WallComponent } from './sb-layout/wall/wall.component';
import { TrainingManagementComponent } from './training-management/training-management.component';
import { UserTrainingManagementComponent } from './user-training-management/user-training-management.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { SbLayoutComponent } from './sb-layout/sb-layout.component';
import { SharedModule } from '../@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountManagementComponent } from './account-management/account-management.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProgressLineChartComponent } from './../charts/progress-line-chart/progress-line-chart.component';
import { UserProgressHistoryComponent } from './user-progress-history/user-progress-history.component';

@NgModule({
  declarations: [
    PagesComponent, 
    WallComponent, 
    TrainingManagementComponent, 
    UserTrainingManagementComponent, 
    TrainingDetailsComponent, 
    SbLayoutComponent, 
    AccountManagementComponent,
    ProgressLineChartComponent,
    UserProgressHistoryComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    NgxChartsModule,
    ReactiveFormsModule,
  ]
})
export class PagesModule { }
