import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  title = '';
  message = '';
  actions = false;

  onAction = new Subject<boolean>();

  constructor(private dialogRef: NbDialogRef<DialogComponent>) {}

  action(value: boolean) {
    this.onAction.next(value);
    this.dialogRef.close();
  }
}
