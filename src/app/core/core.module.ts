import { NgModule } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthInterceptor } from '../interceptors/auth-interceptor';

@NgModule({
  providers: [
    NbSidebarService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule {}
