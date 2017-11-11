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
import { ActivitiesDetailComponent } from './containers/activities-detail/activities-detail.component';
import { ActivitiesListPageComponent } from './containers/activities-page';
import { ActivitiesActions } from './actions/activities.actions';
import { UsersActions } from './../users/actions/users.actions';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ActivitiesDetailComponent,
      },
      { path: '', component: ActivitiesListPageComponent },
    ]),
    StoreModule.forFeature('activities', reducers),
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
    ActivitiesListPageComponent,
    ActivitiesDetailComponent
  ],
  providers: [ ActivitiesActions, UsersActions ]
})
export class ActivitiesModule { }
