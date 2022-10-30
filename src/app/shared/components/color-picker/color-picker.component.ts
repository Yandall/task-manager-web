import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { first } from 'rxjs';
import { EditDialogComponent } from './edit-color-picker/edit-color-picker.component';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements ControlValueAccessor {
  public readonly colorControl = new FormControl();

  constructor(private dialogService: NbDialogService) {}

  writeValue(value: string | null): void {
    this.colorControl.setValue(value);
    this._onChange(value);
  }

  private _onChange(value: string | null) {}
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  private _onTouched() {}
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) this.colorControl.disable();
    else this.colorControl.enable();
  }

  edit() {
    const compRef = this.dialogService.open(EditDialogComponent, {
      closeOnEsc: true,
      context: { pickerColor: this.colorControl.value },
    });
    const subscription = compRef.componentRef.instance.colorSelected.subscribe(
      (value) => {
        this.writeValue(value);
        this._onTouched();
      }
    );
    compRef.onClose.pipe(first()).subscribe(() => {
      subscription.unsubscribe();
    });
  }

  get value() {
    return this.colorControl.value;
  }
}
