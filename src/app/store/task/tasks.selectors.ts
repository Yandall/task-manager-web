import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TasksState } from './tasks.reducer';

export const selectTasksState = createFeatureSelector<TasksState>('tasksState');

export const selectTasks = createSelector(selectTasksState, (tasksState) => {
  return tasksState.list;
});

export const selectTaskBySection = (sectionId: string) =>
  createSelector(selectTasks, (tasks) => {
    return tasks.filter((t) => t.sectionId === sectionId);
  });

export const selectTask = (taskId: String) =>
  createSelector(selectTasks, (tasks) => {
    return tasks.find((t) => t.id === taskId);
  });
