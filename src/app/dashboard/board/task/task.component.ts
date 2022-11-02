import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { first, Observable, Subscription } from 'rxjs';
import { TagsService } from 'src/app/services/tag.service';
import { TasksService } from 'src/app/services/task.service';
import { Tag, Task } from 'src/app/shared/types';

@Component({
  selector: 'board-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  id: string;
  editing = true;

  task: Partial<Task> = {
    content: { title: '', description: '' },
    config: { tags: [] },
  };
  contentForm: FormGroup;

  tagsSubscription: Subscription;
  tags$: Observable<ReadonlyArray<Tag>>;

  constructor(
    private tasksService: TasksService,
    private tagsService: TagsService,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<TaskComponent>,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.tags$ = this.tagsService.getActiveTags();
    this.subscribeToTagList();
    this.dialogRef.onClose.pipe(first()).subscribe(() => {
      this.tasksService.clearActiveTask();
      this.tagsService.clearActiveTags();
      this.tagsSubscription.unsubscribe();
    });
    if (this.editing && this.id)
      this.tasksService
        .selectTask(this.id)
        .pipe(first((task) => Boolean(task)))
        .subscribe((task) => {
          if (task) this.task = { ...task, config: { ...task.config } };
          this.contentForm.setValue({ ...this.task.content });
          this.tags$ = this.tagsService.getActiveTags(this.task.config?.tags);
        });
  }

  save() {
    if (this.contentForm.status !== 'VALID') return;
    this.task.content = this.contentForm.value;

    const service = this.editing
      ? this.tasksService.update
      : this.tasksService.create;
    service
      .bind(this.tasksService)(this.task as Task)
      .pipe(first())
      .subscribe((task) => {
        this.task = { ...task, config: { ...task.config } };
        const status = this.editing ? 'updated' : 'created';
        this.toastrService.show(`Task ${status} succesfully`, 'Status', {
          status: 'success',
        });
        if (!this.editing) {
          const route = `${this.router.url}/${task.id}`;
          this.setRoute(route);
          this.editing = true;
        }
      });
  }

  subscribeToTagList() {
    this.tagsSubscription = this.tags$.subscribe((tags) => {
      this.task.config!.tags = tags.map((t) => t.id);
    });
  }

  close() {
    this.dialogRef.close();
  }

  setRoute(route: string) {
    this.location.go(route);
    this.dialogRef.onClose.pipe(first()).subscribe(() => {
      const routeSections = route.split('/');
      const stepBackUrl = `${routeSections[1]}/${routeSections[2]}`;
      this.location.go(stepBackUrl);
    });
  }

  initForm() {
    this.contentForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(60),
      ]),
      description: new FormControl(''),
    });
  }

  openTagMenu() {
    this.tagsService.openMenu();
  }
}
