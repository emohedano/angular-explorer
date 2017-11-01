import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatToolbarModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule
} from '@angular/material';

import { routes } from './routes';
import { AppComponent } from './app.component';
import { rootReducer } from './reducers';
import { AuthActions } from './auth/actions/auth.actions';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    StoreModule.forRoot(rootReducer),
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [ AuthActions ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
