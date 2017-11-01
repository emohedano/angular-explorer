import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatExpansionModule,
  MatChipsModule
} from '@angular/material';

import { reducers } from './reducers/index';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { UserListComponent } from './containers/user-list/user-list.component';
import { UsersActions } from './actions/users.actions';
import { NameInitialsPipe } from './components/name-initials.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: UserDetailComponent,
      },
      { path: '', component: UserListComponent },
    ]),
    StoreModule.forFeature('users', reducers),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    NameInitialsPipe
  ],
  providers: [
    UsersActions
  ]
})
export class UsersModule { }
