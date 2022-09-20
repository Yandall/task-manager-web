import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultModule } from '../layouts/default/default.module';
import { DashboardComponent } from './dashboard.component';
import { NbMenuModule } from '@nebular/theme';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    LayoutDefaultModule,
    NbMenuModule
  ]
})
export class DashboardModule { }
