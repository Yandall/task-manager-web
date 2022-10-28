import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, first, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Folder } from '../shared/types';
import { AppState } from '../store/app.reducer';
import { fetchFolders } from '../store/folder/folders.actions';

@Injectable()
export class FoldersService {
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  /**
   * Fetch all the folders from API and save them in the store
   */
  fetchFolders() {
    this.http
      .get<Folder[]>(`${environment.URL_API}/folders`)
      .pipe(first())
      .subscribe((folders) => {
        this.store.dispatch(fetchFolders({ folders }));
      });
  }

  /**
   *
   * @returns Observable of folders array with boards that belongs to each folder
   */
  getAllFolders() {
    const folders$ = this.store.select('foldersState');
    const boards$ = this.store.select('boardsState');
    return combineLatest([folders$, boards$]).pipe(
      map((values) => {
        const folders = values[0].list.slice();
        const boards = values[1].list.slice();
        return folders.map((f) => {
          f = { ...f };
          f.boards = boards.filter((b) => b.folderId === f.id);
          return f;
        });
      })
    );
  }
}
