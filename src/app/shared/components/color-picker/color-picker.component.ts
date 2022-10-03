import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { first } from 'rxjs';
import { EditDialogComponent } from './edit-color-picker/edit-color-picker.component';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @Input()
  value = '#FF7128';

  @Output()
  color = new EventEmitter<string>();

  constructor(private dialogService: NbDialogService) {}

  ngOnInit(): void {}

  edit() {
    const compRef = this.dialogService.open(EditDialogComponent, {
      closeOnEsc: true,
      closeOnBackdropClick: true,
      hasBackdrop: true,
    });
    const subscription = compRef.componentRef.instance.colorSelected.subscribe(
      (value) => {
        this.value = value;
        this.color.emit(value);
      }
    );
    compRef.onClose.pipe(first()).subscribe(() => {
      subscription.unsubscribe();
    });
  }
}
