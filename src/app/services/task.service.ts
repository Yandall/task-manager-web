import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../shared/types';

@Injectable()
export class TasksService {
  constructor(private http: HttpClient) {}

  getOne(id: string) {
    return this.http.get<Task>(`${environment.URL_API}/tasks/${id}`);
  }

  update(task: Task) {
    return this.http.put<Task>(`${environment.URL_API}/tasks/${task.id}`, task);
  }
  create(task: Task) {
    return this.http.post<Task>(`${environment.URL_API}/tasks`, task);
  }
}
