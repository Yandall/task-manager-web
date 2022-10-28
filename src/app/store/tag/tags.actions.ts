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
