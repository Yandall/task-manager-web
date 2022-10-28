import { createReducer, on } from '@ngrx/store';
import { Board } from 'src/app/shared/types';
import { genericAdd, genericRemove, genericUpdate } from '../app.generics';
import {
  activeBoard,
  addBoard,
  fetchBoards,
  removeBoard,
  updateBoard,
} from './boards.actions';

export type BoardsState = {
  list: ReadonlyArray<Board>;
  activeBoard: Partial<Board>;
};

const initialState: BoardsState = { list: [], activeBoard: {} };

export const boardsReducer = createReducer(
  initialState,
  on(fetchBoards, (state, { boards }) => {
    return { ...state, list: [...boards] };
  }),
  on(activeBoard, (state, { board }) => {
    return { ...state, activeBoard: { ...board } };
  }),
  on(addBoard, (state, { board }) => genericAdd(state, board)),
  on(updateBoard, (state, { board }) => genericUpdate(state, board)),
  on(removeBoard, (state, { boardId }) => genericRemove(state, boardId))
);
