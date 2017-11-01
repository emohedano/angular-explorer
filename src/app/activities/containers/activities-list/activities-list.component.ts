import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';

import { State } from '../../reducers';
import { Activity } from '../../models/activity.model';
import { ActivitiesActions } from './../../actions/activities.actions';
import * as fromActivity from '../../reducers';
import * as fromAuth from '../../../auth/reducers';

@Component({
  selector: 'app-activities-list',
  templateUrl: './activities-list.component.html',
  styleUrls: ['./activities-list.component.scss']
})
export class ActivitiesListComponent {

  step = 0;
  activities$: Observable<Array<Activity>>;
  isAdminSession$: Observable<boolean>;

  constructor(private actions: ActivitiesActions, private store: Store<State>) {

    this.actions.fetchAllActivities();
    this.activities$ = this.store.select(fromActivity.getAllActivities);
    this.isAdminSession$ = this.store.select(fromAuth.isAdminSession);

  }

  setStep(index: number) {
    this.step = index;
  }
}
