import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/shared/types';

export const addTask = createAction(
  '[Task State] Add Task',
  props<{ task: Task }>()
);

export const removeTask = createAction(
  '[Task State] Remove Task',
  props<{ taskId: string }>()
);

export const updateTask = createAction(
  '[Task State] Update Task',
  props<{ task: Task }>()
);

export const activeTask = createAction(
  '[Task State] Active Task',
  props<{ task: Partial<Task> }>()
);

export const fetchTasks = createAction(
  '[Task State] Fetch Tasks',
  props<{ tasks: ReadonlyArray<Task> }>()
);
