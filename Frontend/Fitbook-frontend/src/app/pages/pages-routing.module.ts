import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingManagementComponent } from './training-management/training-management.component';
import { UserTrainingManagementComponent } from './user-training-management/user-training-management.component';
import { PagesComponent } from './pages.component';
import { SbLayoutComponent } from './sb-layout/sb-layout.component';
import { WallComponent } from './sb-layout/wall/wall.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { UserProgressHistoryComponent } from './user-progress-history/user-progress-history.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SocialGroupManagementComponent } from './sb-layout/social-group-management/social-group-management.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'training', pathMatch: 'full' },
      { path: 'training', component: TrainingManagementComponent },
      { path: 'user-training', component: UserTrainingManagementComponent },
      { path: 'training-details', component: TrainingDetailsComponent },
      { path: 'user-progress-history', component: UserProgressHistoryComponent},
      { path: 'acc-manage', component: AccountManagementComponent },
      { path: 'administration', component: AdminPanelComponent},
      { path: 'search-results', component: SearchResultsComponent},
      { path: 'wall', component: SbLayoutComponent, children: [{ path: '', component: WallComponent }] },
      { path: 'social-group-management', component: SbLayoutComponent, children: [{ path: '', component: SocialGroupManagementComponent}] }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
