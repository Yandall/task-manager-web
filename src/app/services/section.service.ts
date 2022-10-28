import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Section } from '../shared/types';
import { AppState } from '../store/app.reducer';
import {
  addSection,
  fetchSections,
  removeSection,
  updateSection,
} from '../store/section/sections.actions';
import { selectSectionsByBoard } from '../store/section/sections.selectors';

@Injectable()
export class SectionsService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  /**
   * Fetch all the sections from API and save them in the store
   */
  fetchSections() {
    this.http
      .get<Section[]>(`${environment.URL_API}/sections`)
      .pipe(first())
      .subscribe((sections) => {
        this.store.dispatch(fetchSections({ sections }));
      });
  }

  getSectionsByBoard(boardId: string) {
    return this.store.select(selectSectionsByBoard(boardId));
  }

  addSection(data: Section) {
    this.http
      .post<Section>(`${environment.URL_API}/sections`, data)
      .pipe(first())
      .subscribe((section) => {
        this.store.dispatch(addSection({ section }));
      });
  }

  updateSection(data: Section) {
    this.http
      .put<Section>(`${environment.URL_API}/sections/${data.id}`, data)
      .pipe(first())
      .subscribe((section) => {
        this.store.dispatch(updateSection({ section }));
      });
  }

  removeSection(sectionId: string) {
    this.http
      .delete<boolean>(`${environment.URL_API}/sections/${sectionId}`)
      .pipe(first())
      .subscribe(() => {
        this.store.dispatch(removeSection({ sectionId }));
      });
  }
}
