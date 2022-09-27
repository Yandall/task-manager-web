import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultModule } from '../layouts/default/default.module';
import { DashboardComponent } from './dashboard.component';
import { NbMenuModule } from '@nebular/theme';
import { BoardComponent } from './board/board.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DashboardComponent, BoardComponent],
  imports: [CommonModule, LayoutDefaultModule, NbMenuModule, RouterModule],
})
export class DashboardModule {}
