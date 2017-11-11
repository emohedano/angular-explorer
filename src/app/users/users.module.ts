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
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: UserDetailComponent,
      },
      {
        path: ':username/profile',
        component: UserProfileComponent,
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
    MatChipsModule,
    SharedModule
  ],
  declarations: [
    UserListComponent,
    UserDetailComponent,
    NameInitialsPipe,
    UserProfileComponent
  ],
  providers: [
    UsersActions
  ]
})
export class UsersModule { }
