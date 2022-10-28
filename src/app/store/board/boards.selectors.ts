import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsState } from './boards.reducer';

export const selectBoardsState =
  createFeatureSelector<BoardsState>('boardsState');

export const selectBoards = createSelector(selectBoardsState, (boardsState) => {
  return boardsState.list;
});

export const selectBoard = (boardId: String) =>
  createSelector(selectBoards, (boards) => {
    return boards.find((b) => b.id === boardId);
  });
