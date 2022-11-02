import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { first, Observable } from 'rxjs';
import { TagsService } from 'src/app/services/tag.service';
import { TasksService } from 'src/app/services/task.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Tag, Task } from 'src/app/shared/types';

@Component({
  selector: 'board-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent implements OnInit {
  private deleteClicked = false;
  @Input()
  task: Task;

  tags$: Observable<Tag[]>;

  constructor(
    private tasksService: TasksService,
    private tagsService: TagsService,
    private dialogService: NbDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tags$ = this.tagsService.getTagsById(this.task.config.tags);
  }

  edit() {
    if (!this.deleteClicked)
      this.router.navigate([`${this.task.id}`], { relativeTo: this.route });
    this.deleteClicked = false;
  }

  remove() {
    this.deleteClicked = true;
    const dialog = this.dialogService.open(DialogComponent, {
      context: {
        title: 'Delete task',
        message:
          "Are you sure you want to delete this task? You can't restore it later.",
        actions: true,
      },
    });
    dialog.componentRef.instance.onAction.pipe(first()).subscribe((value) => {
      if (value) {
        this.tasksService.delete(this.task.id);
      }
    });
  }
}
