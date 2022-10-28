import { createReducer, on } from '@ngrx/store';
import { Task } from 'src/app/shared/types';
import { genericAdd, genericUpdate, genericRemove } from '../app.generics';
import {
  activeTask,
  addTask,
  fetchTasks,
  removeTask,
  updateTask,
} from './tasks.actions';

export type TasksState = {
  list: ReadonlyArray<Task>;
  activeTask: Partial<Task>;
};

const initialState: TasksState = { list: [], activeTask: {} };

export const tasksReducer = createReducer(
  initialState,
  on(fetchTasks, (state, { tasks }) => {
    return { ...state, list: [...tasks] };
  }),
  on(activeTask, (state, { task }) => {
    return { ...state, activeTask: { ...task } };
  }),
  on(addTask, (state, { task }) => genericAdd(state, task)),
  on(updateTask, (state, { task }) => genericUpdate(state, task)),
  on(removeTask, (state, { taskId }) => genericRemove(state, taskId))
);
