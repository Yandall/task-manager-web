import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbActionsModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
  NbTreeGridModule,
} from '@nebular/theme';
import { AuthInterceptor } from 'src/app/interceptors/auth-interceptor';
import { BoardsService } from 'src/app/services/board.service';
import { FoldersService } from 'src/app/services/folder.service';
import { SectionsService } from 'src/app/services/section.service';
import { LayoutDefaultComponent } from './default.component';

@NgModule({
  declarations: [LayoutDefaultComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule,
    NbActionsModule,
    NbTreeGridModule,
  ],
  providers: [FoldersService, BoardsService, SectionsService, NbSidebarService],
  exports: [LayoutDefaultComponent],
})
export class LayoutDefaultModule {}
