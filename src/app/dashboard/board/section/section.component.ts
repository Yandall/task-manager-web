import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { first, interval, Subscription } from 'rxjs';
import { SectionsService } from 'src/app/services/section.service';
import { Section } from 'src/app/shared/types';
import { EditSectionComponent } from './edit-section/edit-section.component';

@Component({
  selector: 'board-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input()
  section: Section = { config: { title: '' } };
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
      this.sectionsService.updateSection(value).subscribe((updated) => {
        this.section.config = updated.config;
      });
    });
  }
}
