import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const res = this.http.get(`${environment.URL_API}/auth/valid`);
    res
      .pipe(
        catchError((err) => {
          this.router.navigate(['/login']);
          throw { message: err.error.message };
        })
      )
      .subscribe();
  }
}
