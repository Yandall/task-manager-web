import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultModule } from '../layouts/default/default.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    LayoutDefaultModule
  ]
})
export class DashboardModule { }
