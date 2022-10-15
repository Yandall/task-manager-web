import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  logged() {
    return this.http.get(`${environment.URL_API}/auth/valid`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
