import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { first, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TagMenuComponent } from '../shared/components/tag-menu/tag-menu.component';
import { Tag } from '../shared/types';
import {
  addTag,
  addToActiveTags,
  clearActiveTags,
  fetchTags,
  removeFromActiveTags,
  removeTag,
  setActiveTags,
  updateTag,
} from '../store/tag/tags.actions';
import {
  selectActiveTags,
  selectTags,
  selectTagsById,
} from '../store/tag/tags.selectors';

@Injectable()
export class TagsService {
  constructor(
    private http: HttpClient,
    private store: Store,
    private dialogService: NbDialogService
  ) {}

  fetchTags() {
    this.http
      .get<Tag[]>(`${environment.URL_API}/tags`)
      .pipe(first())
      .subscribe((tags) => {
        this.store.dispatch(fetchTags({ tags }));
      });
  }

  createTag(tag: Tag) {
    return this.http.post<Tag>(`${environment.URL_API}/tags`, tag).pipe(
      first(),
      tap((tag) => {
        this.store.dispatch(addTag({ tag }));
      })
    );
  }

  updateTag(tag: Tag) {
    return this.http
      .put<Tag>(`${environment.URL_API}/tags/${tag.id}`, tag)
      .pipe(
        first(),
        tap((tag) => {
          this.store.dispatch(updateTag({ tag }));
        })
      );
  }

  deleteTag(tagId: string) {
    return this.http.delete<Tag>(`${environment.URL_API}/tags/${tagId}`).pipe(
      first(),
      tap((tag) => {
        this.store.dispatch(removeTag({ tagId: tag.id }));
      })
    );
  }

  getTagsById(tagsId: string[] = []) {
    return this.store.select(selectTagsById(tagsId));
  }

  getTagList() {
    return this.store.select(selectTags);
  }

  getActiveTags(tags: string[] = []) {
    if (tags.length > 0) {
      return this.getTagsById(tags).pipe(
        first(),
        switchMap((tags) => {
          this.store.dispatch(setActiveTags({ tags }));
          return this.store.select(selectActiveTags);
        })
      );
    }
    return this.store.select(selectActiveTags);
  }

  clearActiveTags() {
    this.store.dispatch(clearActiveTags());
  }

  addToActiveTags(tag: Tag) {
    this.store.dispatch(addToActiveTags({ tag }));
  }

  removeFromActiveTags(tag: Tag) {
    this.store.dispatch(removeFromActiveTags({ tag }));
  }

  /**
   * Open the menu tag dialog to start editing the tags
   * @param tagsId Array of tags id to select in tag menu
   */
  openMenu() {
    const dialog = this.dialogService.open(TagMenuComponent);
  }
}
