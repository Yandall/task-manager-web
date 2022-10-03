import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Section } from '../shared/types';

@Injectable()
export class SectionsService {
  constructor(private http: HttpClient) {}

  getSectionsByBoard(boardId: string) {
    return this.http.get<Section[]>(
      `${environment.URL_API}/sections/board/${boardId}`
    );
  }

  updateSection(data: Section) {
    return this.http.put<Section>(
      `${environment.URL_API}/sections/${data.id}`,
      data
    );
  }
}
