import { createReducer, on } from '@ngrx/store';
import { Tag } from 'src/app/shared/types';
import { genericAdd, genericRemove, genericUpdate } from '../app.generics';
import {
  addTag,
  addToActiveTags,
  clearActiveTags,
  fetchTags,
  removeFromActiveTags,
  removeTag,
  setActiveTags,
  updateTag,
} from './tags.actions';

export type TagsState = {
  list: ReadonlyArray<Tag>;
  activeTags: ReadonlyArray<Tag>;
};

const initialState: TagsState = { list: [], activeTags: [] };

export const tagsReducer = createReducer(
  initialState,
  on(fetchTags, (state, { tags }) => {
    return { ...state, list: [...tags] };
  }),
  on(setActiveTags, (state, { tags }) => {
    return { ...state, activeTags: [...tags] };
  }),
  on(clearActiveTags, (state) => {
    return { ...state, activeTags: [] };
  }),
  on(addTag, (state, { tag }) =>
    _updateActiveTagsValue(genericAdd(state, tag))
  ),
  on(updateTag, (state, { tag }) =>
    _updateActiveTagsValue(genericUpdate(state, tag))
  ),
  on(removeTag, (state, { tagId }) =>
    _updateActiveTagsValue(genericRemove(state, tagId))
  ),
  on(addToActiveTags, (state, { tag }) => _addTagToSelectionFn(state, tag)),
  on(removeFromActiveTags, (state, { tag }) =>
    _removeTagFromSelectionFn(state, tag)
  )
);

function _updateActiveTagsValue(state: TagsState): TagsState {
  const oldSelectionList = state.activeTags;
  const newSelectionList = state.list.filter((newT) =>
    oldSelectionList.find((oldT) => oldT.id === newT.id)
  ) as ReadonlyArray<Tag>;
  return { ...state, activeTags: newSelectionList };
}

function _addTagToSelectionFn(state: TagsState, tag: Tag) {
  const activeTags = state.activeTags;
  if (activeTags.find((t) => t.id === tag.id)) return state;
  return { ...state, activeTags: [...activeTags, tag] };
}

function _removeTagFromSelectionFn(state: TagsState, tag: Tag) {
  const activeTags = state.activeTags.filter((t) => t.id !== tag.id);
  return { ...state, activeTags };
}
