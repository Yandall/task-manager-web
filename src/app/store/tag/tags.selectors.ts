import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagsState } from './tags.reducer';

export const selectTagsState = createFeatureSelector<TagsState>('tagsState');

export const selectTags = createSelector(
  selectTagsState,
  (tagsState) => tagsState.list
);

export const selectTagsById = (tagsId: string[]) =>
  createSelector(selectTags, (tags) => {
    const list = tags.filter((t) => tagsId.includes(t.id));
    return list;
  });

export const selectActiveTags = createSelector(
  selectTagsState,
  (tagsState) => tagsState.activeTags
);
