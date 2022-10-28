import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SectionsState } from './sections.reducer';

export const selectSectionsState =
  createFeatureSelector<SectionsState>('sectionsState');

export const selectSections = createSelector(
  selectSectionsState,
  (sectionsState) => {
    return sectionsState.list;
  }
);

export const selectSectionsByBoard = (boardId: string) =>
  createSelector(selectSections, (sections) => {
    return sections.filter((s) => s.boardId === boardId);
  });
