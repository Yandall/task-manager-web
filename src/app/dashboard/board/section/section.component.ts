import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { first, Observable } from 'rxjs';
import { SectionsService } from 'src/app/services/section.service';
import { TasksService } from 'src/app/services/task.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Section, Task } from 'src/app/shared/types';
import { TaskComponent } from '../task/task.component';
import { EditSectionComponent } from './edit-section/edit-section.component';

@Component({
  selector: 'board-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  tasks$: Observable<Task[]>;

  @Input()
  section: Section;

  constructor(
    private sectionsService: SectionsService,
    private tasksService: TasksService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {
    this.tasks$ = this.tasksService.getTasksBySection(this.section.id);
  }

  edit() {
    const dialog = this.dialogService.open(EditSectionComponent, {
      context: { section: this.section },
    });
    dialog.componentRef.instance.onSave.pipe(first()).subscribe((section) => {
      this.sectionsService.updateSection(section);
    });
  }

  delete() {
    const dialog = this.dialogService.open(DialogComponent, {
      context: {
        title: 'Delete section',
        message: `Are you sure you want to delete this section? You can't restore it later.`,
        actions: true,
      },
    });
    dialog.componentRef.instance.onAction.pipe(first()).subscribe((value) => {
      if (!value) return;
      this.sectionsService.removeSection(this.section.id!);
    });
  }

  newTask() {
    const partialTask: Partial<Task> = {
      sectionId: this.section.id,
    };
    this.dialogService.open(TaskComponent, {
      context: { editing: false, task: partialTask as Task },
    });
  }
}
