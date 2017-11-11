import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { Activity } from '../../../activities/models/activity.model';
import { State } from '../../reducers';
import * as fromUser from '../../reducers';
import * as fromActivity from '../../../activities/reducers';
import { UsersActions } from './../../actions/users.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  activities: Array<Activity>;
  user$: Observable<User>;
  routeSub: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<State>,
    private actions: UsersActions
  ) {

  }

  ngOnInit() {

    this.user$ = this.store.select(fromUser.getSelectedUser);

    this.user$.subscribe((user) => {
      this.activities = user.bountyClaims.map(a => a.activity);
    });

    this.routeSub = this.route.params.subscribe(params => {

      const userId = params['username'];
      this.actions.fetchUser(userId);

    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
