import { createReducer, on } from '@ngrx/store';
import { Folder } from 'src/app/shared/types';
import { genericAdd, genericUpdate, genericRemove } from '../app.generics';
import {
  addFolder,
  fetchFolders,
  removeFolder,
  updateFolder,
} from './folders.actions';

export type FoldersState = { list: ReadonlyArray<Folder> };

const initialState: FoldersState = { list: [] };

export const foldersReducer = createReducer(
  initialState,
  on(fetchFolders, (state, { folders }) => {
    return { ...state, list: [...folders] };
  }),
  on(addFolder, (state, { folder }) => genericAdd(state, folder)),
  on(updateFolder, (state, { folder }) => genericUpdate(state, folder)),
  on(removeFolder, (state, { folderId }) => genericRemove(state, folderId))
);
