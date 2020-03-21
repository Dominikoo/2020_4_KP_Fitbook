import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';


const IE_MODULES = [ TopbarComponent ];


@NgModule({
  declarations: [...IE_MODULES],
  imports: [
    CommonModule
  ],
  exports: [...IE_MODULES]
})
export class SharedModule { }
