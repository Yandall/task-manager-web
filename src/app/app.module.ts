import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarService, NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbButtonModule, NbCheckboxModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { LayoutDefaultModule } from './layouts/default/default.module';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbCardModule,
    NbEvaIconsModule,
    AppRoutingModule,
    DashboardModule,
    LayoutDefaultModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbButtonModule,
    NbCheckboxModule
  ],
  providers: [NbSidebarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
