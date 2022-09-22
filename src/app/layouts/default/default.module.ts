import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  NbActionsModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbSidebarService,
} from '@nebular/theme';
import { AuthInterceptor } from 'src/app/interceptors/auth-interceptor';
import { LayoutDefaultComponent } from './default.component';

@NgModule({
  declarations: [LayoutDefaultComponent],
  imports: [
    RouterModule,
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbIconModule,
    NbActionsModule,
  ],
  providers: [
    NbSidebarService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  exports: [LayoutDefaultComponent],
})
export class LayoutDefaultModule {}
