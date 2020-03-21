import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home.component';
import { SharedModule } from '../@shared/shared.module';
import { LoginSidebarComponent } from './@components/login-sidebar/login-sidebar.component';


@NgModule({
  declarations: [
    AboutComponent,
    RegisterComponent,
    HomeComponent,
    LoginSidebarComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
