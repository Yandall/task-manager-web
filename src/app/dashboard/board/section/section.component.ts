import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { first } from 'rxjs';
import { SectionsService } from 'src/app/services/section.service';
import { Section } from 'src/app/shared/types';
import { EditSectionComponent } from './edit-section/edit-section.component';

@Component({
  selector: 'board-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input()
  section: Section = { config: { title: '' } };
  constructor(
    private sectionsService: SectionsService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit() {}

  edit() {
    const dialog = this.dialogService.open(EditSectionComponent, {
      context: { section: this.section },
      closeOnBackdropClick: true,
    });
    dialog.componentRef.instance.onSave.subscribe((value) => {
      this.sectionsService
        .updateSection(value)
        .pipe(first())
        .subscribe((updated) => {
          this.section.config = (updated as Section).config;
        });
    });
  }
}
