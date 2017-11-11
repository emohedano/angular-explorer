import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
  MatInputModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
  MatExpansionModule,
  MatChipsModule
} from '@angular/material';

import { ActivitiesListComponent } from './components/activities-list/activities-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatExpansionModule,
    MatChipsModule
  ],
  exports: [ ActivitiesListComponent ],
  declarations: [
    ActivitiesListComponent
  ],
  providers: []
})
export class SharedModule { }
