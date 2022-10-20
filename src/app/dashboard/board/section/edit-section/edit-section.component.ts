import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { Section } from 'src/app/shared/types';

@Component({
  selector: 'board-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss'],
})
export class EditSectionComponent implements OnInit {
  sectionForm: FormGroup;
  section: Section;

  onSave = new Subject<Section>();

  constructor(private dialogRef: NbDialogRef<EditSectionComponent>) {}

  ngOnInit(): void {
    this.initForm();
    this.sectionForm.setValue({ ...this.section.config });
  }

  save() {
    this.onSave.next({ ...this.section, config: this.sectionForm.value });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  initForm() {
    this.sectionForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
      ]),
      accent: new FormControl(''),
    });
  }
}
