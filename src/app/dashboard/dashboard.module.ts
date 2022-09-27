import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultModule } from '../layouts/default/default.module';
import { DashboardComponent } from './dashboard.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbMenuModule,
} from '@nebular/theme';
import { BoardComponent } from './board/board.component';
import { RouterModule } from '@angular/router';
import { SectionComponent } from './board/section/section.component';

@NgModule({
  declarations: [DashboardComponent, BoardComponent, SectionComponent],
  imports: [
    CommonModule,
    LayoutDefaultModule,
    NbMenuModule,
    RouterModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
  ],
})
export class DashboardModule {}
