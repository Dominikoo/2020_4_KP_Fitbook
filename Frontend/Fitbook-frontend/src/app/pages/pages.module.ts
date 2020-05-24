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
import { UserWeightLineChartComponent} from './../charts/user-weight-line-chart/user-weight-line-chart.component';
import { UserProgressHistoryComponent } from './user-progress-history/user-progress-history.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { TextPostComponent } from './sb-layout/wall/@components/text-post/text-post.component';
import { PostCreatorComponent } from './sb-layout/wall/@components/post-creator/post-creator.component';
import { SharedTrainingPlanPostComponent } from './sb-layout/wall/@components/shared-training-plan-post/shared-training-plan-post.component';
import { SharedWeightChartPostComponent } from './sb-layout/wall/@components/shared-weight-chart-post/shared-weight-chart-post.component';

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
    UserWeightLineChartComponent,
    UserProgressHistoryComponent,
    AdminPanelComponent,
    SearchResultsComponent,
    TextPostComponent,
    PostCreatorComponent,
    SharedTrainingPlanPostComponent,
    SharedWeightChartPostComponent],
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
