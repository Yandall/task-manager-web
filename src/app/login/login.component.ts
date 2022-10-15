import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { catchError, first, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: { email: string; password: string; keepLogged: boolean } = {
    email: '',
    password: '',
    keepLogged: false,
  };

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    if (!token) return;
    const res = this.http.get(`${environment.URL_API}/auth/valid`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    res
      .pipe(
        first(),
        catchError((err) => {
          this.cookieService.delete('token');
          throw { message: err.error.message };
        })
      )
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  login() {
    const res = this.http.post(`${environment.URL_API}/auth/login`, this.user);
    res
      .pipe(
        catchError((err) => {
          return throwError(() => Error(err.error.message));
        })
      )
      .subscribe((value: any) => {
        this.cookieService.set('token', value.accessToken);
        this.router.navigate(['/dashboard']);
      });
  }

  register() {
    console.log('demasiado registrado');
  }
}
