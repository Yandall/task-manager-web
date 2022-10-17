import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
  NbIconModule,
} from '@nebular/theme';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { EditDialogComponent } from './color-picker/edit-color-picker/edit-color-picker.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [ColorPickerComponent, EditDialogComponent, DialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    NbIconModule,
    NbButtonModule,
    NbDialogModule,
    NbCardModule,
  ],
  providers: [NbDialogService],
  exports: [ColorPickerComponent],
})
export class SharedModule {}
