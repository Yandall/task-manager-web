import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbIconModule,
  NbFormFieldModule,
  NbButtonModule,
  NbCheckboxModule,
  NbMenuModule,
  NbDialogModule,
  NbToastrModule,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './store/app.reducer';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CoreModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbCardModule,
    NbEvaIconsModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot({ closeOnEsc: false, closeOnBackdropClick: false }),
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
    }),
    NbButtonModule,
    NbCheckboxModule,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
