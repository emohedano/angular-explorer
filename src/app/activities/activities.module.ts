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
import { ActivitiesListComponent } from './containers/activities-list/activities-list.component';
import { ActivitiesActions } from './actions/activities.actions';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: ActivitiesDetailComponent,
      },
      { path: '', component: ActivitiesListComponent },
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
    MatChipsModule
  ],
  declarations: [
    ActivitiesListComponent,
    ActivitiesDetailComponent
  ],
  providers: [ ActivitiesActions ]
})
export class ActivitiesModule { }
