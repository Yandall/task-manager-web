import { Component, EventEmitter, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Section } from 'src/app/shared/types';

@Component({
  selector: 'board-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss'],
})
export class EditSectionComponent implements OnInit {
  section: Section = {
    config: { title: '' },
  };
  editConfig: { [key: string]: any } = {
    title: '',
    accentColor: '',
  };

  onSave = new EventEmitter<Section>();

  constructor(private dialogRef: NbDialogRef<EditSectionComponent>) {}

  ngOnInit(): void {
    this.editConfig = { ...this.section.config };
  }

  save() {
    this.onSave.emit({ ...this.section, config: this.editConfig });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
