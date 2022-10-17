import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { Section } from 'src/app/shared/types';

@Component({
  selector: 'board-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss'],
})
export class EditSectionComponent implements OnInit {
  section: Partial<Section> = {};
  editConfig: { [key: string]: any } = {
    title: '',
    accentColor: '',
  };

  onSave = new Subject<Section>();

  constructor(private dialogRef: NbDialogRef<EditSectionComponent>) {}

  ngOnInit(): void {
    this.editConfig = { ...this.section.config };
  }

  save() {
    this.onSave.next({ ...(this.section as Section), config: this.editConfig });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
