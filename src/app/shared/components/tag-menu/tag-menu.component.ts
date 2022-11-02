import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { combineLatest, first, map, Observable, Subject } from 'rxjs';
import { TagsService } from 'src/app/services/tag.service';
import { Tag } from '../../types';

@Component({
  selector: 'tag-menu',
  templateUrl: './tag-menu.component.html',
  styleUrls: ['./tag-menu.component.scss'],
})
export class TagMenuComponent implements OnInit {
  tagsSelected$: Observable<ReadonlyArray<Tag>>;
  tagList$: Observable<ReadonlyArray<Tag>>;

  tagForm: FormGroup;

  editing = false;

  constructor(
    private tagsService: TagsService,
    private toastrService: NbToastrService,
    private dialogRef: NbDialogRef<TagMenuComponent>
  ) {}

  ngOnInit() {
    this.initForm();
    this.tagList$ = this.tagsService.getTagList();
    this.tagsSelected$ = this.tagsService.getActiveTags();
  }

  addTag(tag: Tag) {
    this.tagsService.addToActiveTags(tag);
    this.selectTag(tag);
  }

  removeTag(tag: Tag) {
    this.tagsService.removeFromActiveTags(tag);
  }

  selectTag(tag: Partial<Tag>, edit = true) {
    this.tagForm.setValue({ id: tag.id, name: tag.name, color: tag.color });
    this.editing = edit;
  }

  getAvailableTags() {
    return combineLatest([this.tagList$, this.tagsSelected$]).pipe(
      map((tags) => {
        const list = tags[0];
        const selected = tags[1];
        return list.filter(
          (tagA) => !selected.find((tagS) => tagS.id === tagA.id)
        );
      })
    );
  }

  saveTag() {
    if (this.tagForm.status !== 'VALID') return;
    const service = this.editing
      ? this.tagsService.updateTag
      : this.tagsService.createTag;
    const tag = this.tagForm.value as Tag;
    service
      .bind(this.tagsService)(tag)
      .pipe(first())
      .subscribe((tag) => {
        const status = this.editing ? 'updated' : 'created';
        const message = `Tag ${status} succesfully`;
        this.toastrService.show(message, 'Status', { status: 'success' });
        this.selectTag({ id: tag.id, name: tag.name, color: tag.color });
      });
  }

  deleteTag() {
    const tagId = this.tagForm.value['id'];
    if (!Boolean(tagId)) return;
    this.tagsService
      .deleteTag(tagId)
      .pipe(first())
      .subscribe(() => {
        this.selectTag({ id: '', name: '', color: '' }, false);
        this.toastrService.show('Tag deleted succesfully', 'Status', {
          status: 'success',
        });
      });
  }

  close() {
    this.dialogRef.close();
  }

  initForm() {
    this.tagForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]),
      color: new FormControl(''),
    });
  }
}
