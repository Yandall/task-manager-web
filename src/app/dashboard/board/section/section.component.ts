import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { first } from 'rxjs';
import { SectionsService } from 'src/app/services/section.service';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { Section, Task } from 'src/app/shared/types';
import { TaskComponent } from '../task/task.component';
import { EditSectionComponent } from './edit-section/edit-section.component';

@Component({
  selector: 'board-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input()
  section: Section;

  @Output()
  deleted = new EventEmitter<string>();
  constructor(
    private sectionsService: SectionsService,
    private dialogService: NbDialogService
  ) {}

  edit() {
    const dialog = this.dialogService.open(EditSectionComponent, {
      context: { section: this.section },
      closeOnBackdropClick: true,
    });
    dialog.componentRef.instance.onSave.pipe(first()).subscribe((value) => {
      this.sectionsService
        .updateSection(value)
        .pipe(first())
        .subscribe((updated) => {
          this.section.config = updated.config;
        });
    });
  }

  delete() {
    const dialog = this.dialogService.open(DialogComponent, {
      context: {
        title: 'Delete section',
        message:
          "Are you sure you want to delete this section? You can't restore it later.",
        actions: true,
      },
      closeOnBackdropClick: true,
    });
    dialog.componentRef.instance.onAction.pipe(first()).subscribe((value) => {
      if (!value) return;
      this.sectionsService
        .deleteSection(this.section.id!)
        .pipe(first())
        .subscribe((res) => {
          if (!res) return;
          this.deleted.emit(this.section.id);
        });
    });
  }

  newTask() {
    const partialTask: Partial<Task> = {
      config: { tags: [] },
      content: { title: '', description: '' },
      sectionId: this.section.id,
    };
    const dialog = this.dialogService.open(TaskComponent, {
      context: { editing: false, task: partialTask as Task },
    });
  }

  deleteTask(task: Task) {
    this.section.tasks = this.section.tasks.filter((t) => t.id !== task.id);
  }
}
