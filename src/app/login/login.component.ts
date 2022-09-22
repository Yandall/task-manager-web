import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
        catchError((err) => {
          this.cookieService.delete('token');
          throw { message: err.error.message };
        })
      )
      .subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
  }

  login(form: NgForm) {
    const user = form.value;
    const res = this.http.post(`${environment.URL_API}/auth/login`, {
      email: user.email,
      password: user.password,
      keepLogged: user.keepLogged,
    });
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
