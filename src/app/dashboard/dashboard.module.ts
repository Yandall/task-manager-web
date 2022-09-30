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
} from '@nebular/theme';
import { BoardComponent } from './board/board.component';
import { RouterModule } from '@angular/router';
import { SectionComponent } from './board/section/section.component';
import { EditSectionComponent } from './board/section/edit-section/edit-section.component';
import { FormsModule } from '@angular/forms';
import { TaskComponent } from './board/task/task.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardComponent,
    SectionComponent,
    EditSectionComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbFormFieldModule,
    LayoutDefaultModule,
    NbMenuModule,
    RouterModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbDialogModule.forChild(),
  ],
})
export class DashboardModule {}
