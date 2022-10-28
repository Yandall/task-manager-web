import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Event, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { first } from 'rxjs';
import { TasksService } from 'src/app/services/task.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Task } from 'src/app/shared/types';

@Component({
  selector: 'board-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  private deleteClicked = false;
  @Input()
  task: Task;

  constructor(
    private tasksService: TasksService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {}

  edit() {
    if (!this.deleteClicked)
      this.router.navigate([`${this.task.id}`], { relativeTo: this.route });
    this.deleteClicked = false;
  }

  async remove() {
    this.deleteClicked = true;
    const dialog = this.dialogService.open(DialogComponent, {
      context: {
        title: 'Delete task',
        message:
          "Are you sure you want to delete this task? You can't restore it later.",
        actions: true,
      },
      closeOnBackdropClick: true,
    });
    dialog.componentRef.instance.onAction.pipe(first()).subscribe((value) => {
      if (value) {
        this.tasksService.delete(this.task.id);
      }
    });
  }
}
