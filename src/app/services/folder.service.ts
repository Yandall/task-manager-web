import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Folder } from '../shared/types';

@Injectable()
export class FoldersService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Folder[]>(`${environment.URL_API}/folders`);
  }

  getOne(id: string) {
    return this.http.get<Folder>(`${environment.URL_API}/folders/${id}`);
  }
}
