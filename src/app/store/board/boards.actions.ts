import { createAction, props } from '@ngrx/store';
import { Board } from 'src/app/shared/types';

export const addBoard = createAction(
  '[Board State] Add board',
  props<{ board: Board }>()
);

export const removeBoard = createAction(
  '[Board State] Remove Board',
  props<{ boardId: string }>()
);

export const updateBoard = createAction(
  '[Board State] Update Board',
  props<{ board: Board }>()
);

export const fetchBoards = createAction(
  '[Board State] Fetch Boards',
  props<{ boards: ReadonlyArray<Board> }>()
);

export const activeBoard = createAction(
  '[Board State] Active Board',
  props<{ board: Partial<Board> }>()
);
