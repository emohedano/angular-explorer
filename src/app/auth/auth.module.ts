import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthActions } from './actions/auth.actions';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ AuthActions ],
  declarations: []
})
export class AuthModule { }
