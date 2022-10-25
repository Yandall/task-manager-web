import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  task: Task;
  contentForm: FormGroup;
  editing = true;
  constructor(
    private tasksService: TasksService,
    private dialogRef: NbDialogRef<TaskComponent>,
    private toastrService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.editing && this.id)
      this.tasksService
        .getOne(this.id)
        .pipe(first())
        .subscribe((value) => {
          this.task = value;
          this.contentForm.setValue({ ...value.content });
        });
  }

  save() {
    if (this.contentForm.status !== 'VALID') return;
    this.task.content = this.contentForm.value;
    const service = this.editing
      ? this.tasksService.update
      : this.tasksService.create;

    service
      .bind(this.tasksService)(this.task)
      .pipe(first())
      .subscribe((value) => {
        this.task = value;
        const status = this.editing ? 'updated' : 'created';
        this.editing = true;
        this.toastrService.show(`Task ${status} succesfully`, 'Status', {
          status: 'success',
        });
      });
  }

  removeTag(tag: Tag) {
    this.task.config.tags = this.task.config.tags.filter(
      (t) => t.id !== tag.id
    );
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
