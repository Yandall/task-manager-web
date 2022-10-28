import { ActionReducerMap } from '@ngrx/store';
import { boardsReducer, BoardsState } from './board/boards.reducer';
import { foldersReducer, FoldersState } from './folder/folders.reducer';
import { sectionsReducer, SectionsState } from './section/sections.reducer';
import { tagsReducer, TagsState } from './tag/tags.reducer';
import { tasksReducer, TasksState } from './task/tasks.reducer';

export type AppState = {
  foldersState: FoldersState;
  boardsState: BoardsState;
  sectionsState: SectionsState;
  tasksState: TasksState;
  tagsState: TagsState;
};

export const appReducer: ActionReducerMap<AppState> = {
  boardsState: boardsReducer,
  foldersState: foldersReducer,
  sectionsState: sectionsReducer,
  tasksState: tasksReducer,
  tagsState: tagsReducer,
};
