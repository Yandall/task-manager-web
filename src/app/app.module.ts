import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarService, NbCardModule, NbInputModule, NbIconModule, NbFormFieldModule, NbButtonModule, NbCheckboxModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { LayoutDefaultModule } from './layouts/default/default.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FormsModule } from '@angular/forms';
import {CookieService} from "ngx-cookie-service"

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
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
    NbMenuModule.forRoot(),
    NbButtonModule,
    NbCheckboxModule
  ],
  providers: [NbSidebarService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
