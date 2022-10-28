import { createReducer, on } from '@ngrx/store';
import { Tag } from 'src/app/shared/types';
import { genericAdd, genericRemove, genericUpdate } from '../app.generics';
import { addTag, fetchTags, removeTag, updateTag } from './tags.actions';

export type TagsState = { list: ReadonlyArray<Tag> };

const initialState: TagsState = { list: [] };

export const tagsReducer = createReducer(
  initialState,
  on(fetchTags, (state, { tags }) => {
    return { ...state, list: [...tags] };
  }),
  on(addTag, (state, { tag }) => genericAdd(state, tag)),
  on(updateTag, (state, { tag }) => genericUpdate(state, tag)),
  on(removeTag, (state, { tagId }) => genericRemove(state, tagId))
);
