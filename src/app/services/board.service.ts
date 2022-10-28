import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Board } from '../shared/types';
import { AppState } from '../store/app.reducer';
import { activeBoard, fetchBoards } from '../store/board/boards.actions';
import { selectBoard } from '../store/board/boards.selectors';

@Injectable()
export class BoardsService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  fetchBoards() {
    this.http
      .get<Board[]>(`${environment.URL_API}/boards`)
      .pipe(first())
      .subscribe((boards) => {
        this.store.dispatch(fetchBoards({ boards }));
      });
  }

  selectBoard(boardId: string) {
    return this.store.select(selectBoard(boardId)).pipe(
      tap((board) => {
        return this.store.dispatch(activeBoard({ board: board || {} }));
      })
    );
  }
}
