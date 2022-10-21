import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from '../shared/guards/logged.guard';
import { BoardComponent } from './board/board.component';
import { TaskEntrypointComponent } from './board/task/task-item/task-entrypoint.component';
import { TaskComponent } from './board/task/task.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoggedGuard],
    component: DashboardComponent,
    children: [
      {
        path: ':id',
        component: BoardComponent,
        children: [{ path: ':id', component: TaskEntrypointComponent }],
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
