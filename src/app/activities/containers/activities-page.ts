import { BountyClaim } from './../../users/models/bounty-claim.model';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { State } from '../../reducers';
import { Activity } from '../models/activity.model';
import { User } from './../../users/models/user.model';
import { UsersActions } from './../../users/actions/users.actions';
import { ActivitiesActions } from '../actions/activities.actions';
import * as fromActivity from '../reducers';
import * as fromAuth from '../../auth/reducers';

Observable.prototype['map'] = map;


@Component({
  selector: 'app-activities-list-page',
  template: `
    <app-activities-list
      [activities]="activities$ | async"
      [bountyClaims]="bountyClaims$ | async"
      [displayEditButton]="isAdminSession$ | async"
      (onBountyClaimed)="onBountyClaimed($event)"
    >
    </app-activities-list>
    <a mat-fab color="primary" class="btn-new" routerLink="/activities/new" *ngIf="isAdminSession$ | async">
      <i class="mdi mdi-plus"></i>
    </a>
  `,
  styles: [`
    .btn-new{
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      font-size: 30px;
    }
  `]
})
export class ActivitiesListPageComponent implements OnInit {

  step = 0;
  activities$: Observable<Array<Activity>>;
  bountyClaims$: Observable<Array<BountyClaim>>;
  public isAdminSession$: Observable<boolean>;

  constructor(
    private actions: ActivitiesActions,
    private store: Store<State>,
    private userActions: UsersActions
  ) {}

  ngOnInit() {

    this.actions.fetchAllActivities();
    this.isAdminSession$ = this.store.select(fromAuth.isAdminSession);

    this.bountyClaims$ = this.store.select(fromAuth.getLoggedUser)['map']((loggedUser: User) => {
      return (loggedUser) ? loggedUser.bountyClaims : null;
    });

    this.activities$ = this.store.select(fromActivity.getAllActivities);

  }

  onBountyClaimed(activity: Activity) {
    this.userActions.claimBounty(activity);
  }


}
