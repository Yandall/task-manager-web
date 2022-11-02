import { createAction, props } from '@ngrx/store';
import { Tag } from 'src/app/shared/types';

export const fetchTags = createAction(
  '[Tag State] Fetch Tags',
  props<{ tags: ReadonlyArray<Tag> }>()
);

export const addTag = createAction(
  '[Tag State] Add Tag',
  props<{ tag: Tag }>()
);

export const removeTag = createAction(
  '[Tag State] Remove Tag',
  props<{ tagId: string }>()
);

export const updateTag = createAction(
  '[Tag State] Update Tag',
  props<{ tag: Tag }>()
);

export const setActiveTags = createAction(
  '[Tag State] Set Active Tags',
  props<{ tags: ReadonlyArray<Tag> }>()
);

export const clearActiveTags = createAction('[Tag State] Clear Active Tags');

export const addToActiveTags = createAction(
  '[Tag State] Add Tag To Active',
  props<{ tag: Tag }>()
);

export const removeFromActiveTags = createAction(
  '[Tag State] Remove Tag From Active',
  props<{ tag: Tag }>()
);
