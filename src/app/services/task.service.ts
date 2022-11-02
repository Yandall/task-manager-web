import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../shared/types';
import { AppState } from '../store/app.reducer';
import {
  setActiveTask,
  addTask,
  fetchTasks,
  removeTask,
  updateTask,
  clearActiveTask,
} from '../store/task/tasks.actions';
import { selectTask, selectTaskBySection } from '../store/task/tasks.selectors';

@Injectable()
export class TasksService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  fetchTasks() {
    this.http
      .get<Task[]>(`${environment.URL_API}/tasks`)
      .pipe(first())
      .subscribe((tasks) => {
        this.store.dispatch(fetchTasks({ tasks }));
      });
  }

  getTasksBySection(sectionId: string) {
    return this.store.select(selectTaskBySection(sectionId));
  }

  selectTask(taskId: string) {
    return this.store.select(selectTask(taskId)).pipe(
      tap((task) => {
        this.store.dispatch(setActiveTask({ task: task || {} }));
      })
    );
  }

  clearActiveTask() {
    this.store.dispatch(clearActiveTask());
  }

  update(task: Task) {
    return this.http
      .put<Task>(`${environment.URL_API}/tasks/${task.id}`, task)
      .pipe(
        first(),
        tap((task) => {
          this.store.dispatch(updateTask({ task }));
        })
      );
  }
  create(task: Task) {
    return this.http.post<Task>(`${environment.URL_API}/tasks`, task).pipe(
      first(),
      tap((task) => {
        this.store.dispatch(addTask({ task }));
        this.store.dispatch(setActiveTask({ task }));
      })
    );
  }

  delete(id: string) {
    this.http
      .delete<Task>(`${environment.URL_API}/tasks/${id}`)
      .pipe(first())
      .subscribe((task) => {
        this.store.dispatch(removeTask({ taskId: task.id }));
      });
  }
}
