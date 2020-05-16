import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

const IE_MODULES = [ TopbarComponent ];


@NgModule({
  declarations: [...IE_MODULES],
  imports: [
    CommonModule,
    CollapseModule,
    BsDropdownModule,
    FormsModule,   
    ReactiveFormsModule 
  ],
  exports: [...IE_MODULES]
})
export class SharedModule { }
