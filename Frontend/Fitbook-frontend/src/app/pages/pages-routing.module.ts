import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingManagementComponent } from './training-management/training-management.component';
import { PagesComponent } from './pages.component';
import { SbLayoutComponent } from './sb-layout/sb-layout.component';
import { WallComponent } from './sb-layout/wall/wall.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'training', pathMatch: 'full' },
      { path: 'training', component: TrainingManagementComponent },
      { path: 'wall', component: SbLayoutComponent, children: [{ path: '', component: WallComponent }] }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
