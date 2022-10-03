import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
} from '@nebular/theme';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { EditDialogComponent } from './color-picker/edit-color-picker/edit-color-picker.component';

@NgModule({
  declarations: [ColorPickerComponent, EditDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbIconModule,
    NbButtonModule,
    NbDialogModule,
  ],
  providers: [NbDialogService],
  exports: [ColorPickerComponent],
})
export class SharedModule {}
