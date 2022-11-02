import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbDialogService,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbTagModule,
} from '@nebular/theme';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { EditDialogComponent } from './color-picker/edit-color-picker/edit-color-picker.component';
import { DialogComponent } from './dialog/dialog.component';
import { MarkdownModule } from './markdown/markdown.module';
import { TagMenuComponent } from './tag-menu/tag-menu.component';

@NgModule({
  declarations: [
    ColorPickerComponent,
    EditDialogComponent,
    DialogComponent,
    TagMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbIconModule,
    NbButtonModule,
    NbDialogModule,
    NbCardModule,
    NbTagModule,
    NbFormFieldModule,
    NbInputModule,
    MarkdownModule,
  ],
  providers: [NbDialogService],
  exports: [ColorPickerComponent, MarkdownModule],
})
export class SharedModule {}
