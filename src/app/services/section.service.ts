import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class SectionsService {
  constructor(private http: HttpClient) {}

  getSectionsByBoard(boardId: string) {
    return this.http.get(`${environment.URL_API}/sections/board/${boardId}`);
  }
}
