import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { first, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({ providedIn: 'root' })
export class LoggedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.logged().pipe(
      first(),
      map((logged) => {
        if (!logged) return this.router.createUrlTree(['/login']);
        return logged;
      })
    );
  }
}
