import { createAction, props } from '@ngrx/store';
import { Folder } from 'src/app/shared/types';

export const addFolder = createAction(
  '[Folder State] Add folder',
  props<{ folder: Folder }>()
);

export const removeFolder = createAction(
  '[Folder State] Remove Folder',
  props<{ folderId: string }>()
);

export const updateFolder = createAction(
  '[Folder State] Update Folder',
  props<{ folder: Folder }>()
);

export const fetchFolders = createAction(
  '[Folder State] Fetch Folders',
  props<{ folders: ReadonlyArray<Folder> }>()
);
