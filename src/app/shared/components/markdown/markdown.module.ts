import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbInputModule } from '@nebular/theme';
import { MarkdownComponent } from './markdown.component';

@NgModule({
  declarations: [MarkdownComponent],
  exports: [MarkdownComponent],
  imports: [
    CommonModule,
    NbButtonModule,
    NbInputModule,
    NbActionsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MarkdownModule {}
