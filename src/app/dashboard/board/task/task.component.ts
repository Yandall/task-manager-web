import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { first } from 'rxjs';
import { TasksService } from 'src/app/services/task.service';
import { Tag, Task } from 'src/app/shared/types';

@Component({
  selector: 'board-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  id: string;
  task: Partial<Task> = {
    content: { title: '', description: '' },
    config: { tags: [] },
  };
  contentForm: FormGroup;
  editing = true;
  constructor(
    private tasksService: TasksService,
    private dialogRef: NbDialogRef<TaskComponent>,
    private toastrService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.editing && this.id)
      this.tasksService
        .selectTask(this.id)
        .pipe(first((task) => Boolean(task)))
        .subscribe((task) => {
          if (task) this.task = { ...task };
          this.contentForm.setValue({ ...this.task.content });
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
        this.task = { ...task };
        if (!this.editing)
          this.router.navigate([`${task.id}`], { relativeTo: this.route });
        const status = this.editing ? 'updated' : 'created';
        this.toastrService.show(`Task ${status} succesfully`, 'Status', {
          status: 'success',
        });
      });
  }

  removeTag(tag: Tag) {
    this.task.config!.tags =
      this.task.config?.tags.filter((t) => t.id !== tag.id) || [];
  }

  close() {
    this.dialogRef.close();
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
}
