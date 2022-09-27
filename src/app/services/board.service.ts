import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Board } from '../shared/types';

@Injectable()
export class BoardsService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Board[]>(`${environment.URL_API}/boards`);
  }

  getOne(id: string) {
    return this.http.get<Board>(`${environment.URL_API}/boards/${id}`);
  }
}
