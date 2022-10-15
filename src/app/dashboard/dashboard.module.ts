import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultModule } from '../layouts/default/default.module';
import { DashboardComponent } from './dashboard.component';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbMenuModule,
  NbTagModule,
} from '@nebular/theme';
import { BoardComponent } from './board/board.component';
import { RouterModule } from '@angular/router';
import { SectionComponent } from './board/section/section.component';
import { EditSectionComponent } from './board/section/edit-section/edit-section.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './board/task/task.component';
import { SharedModule } from '../shared/components/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    SectionComponent,
    EditSectionComponent,
    TaskComponent,
  ],
  imports: [
    RouterModule,
    DashboardRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    NbFormFieldModule,
    LayoutDefaultModule,
    NbMenuModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTagModule,
    NbDialogModule.forChild(),
  ],
})
export class DashboardModule {}
