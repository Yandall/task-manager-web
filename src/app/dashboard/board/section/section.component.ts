import { Component, Input, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Section } from 'src/app/shared/types';
import { EditSectionComponent } from './edit-section/edit-section.component';

@Component({
  selector: 'board-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input()
  section: Section = {};
  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  edit() {
    const dialog = this.dialogService.open(EditSectionComponent, {
      context: { section: this.section },
    });
    dialog.componentRef.instance.onSave.subscribe((value) => {
      this.section = value;
      console.log(value);
    });
  }
}
