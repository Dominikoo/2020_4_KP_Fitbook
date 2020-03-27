import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { WallComponent } from './sb-layout/wall/wall.component';
import { TrainingManagementComponent } from './training-management/training-management.component';
import { SbLayoutComponent } from './sb-layout/sb-layout.component';
import { SharedModule } from '../@shared/shared.module';


@NgModule({
  declarations: [PagesComponent, WallComponent, TrainingManagementComponent, SbLayoutComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
