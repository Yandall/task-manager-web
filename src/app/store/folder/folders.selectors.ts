import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FoldersState } from './folders.reducer';

export const selectFoldersState =
  createFeatureSelector<FoldersState>('foldersState');

export const selectFolders = createSelector(
  selectFoldersState,
  (foldersState) => {
    return foldersState.list;
  }
);
