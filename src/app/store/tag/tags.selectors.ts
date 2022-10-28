import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TagsState } from './tags.reducer';

export const selectTagsState = createFeatureSelector<TagsState>('tagsState');

export const selectTags = createSelector(selectTagsState, (tagsState) => {
  return tagsState.list;
});
