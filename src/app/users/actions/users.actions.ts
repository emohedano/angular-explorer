import { Activity } from './../../activities/models/activity.model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { db } from './../../shared/db';
import { User } from '../models/user.model';
import { BountyClaim } from '../models/bounty-claim.model';
import { State } from '../../reducers';
import { environment } from '../../../environments/environment';
import * as fromAuth from '../../auth/reducers';

export const LOAD_USERS = '[Users] Load';
export const LOAD_USERS_SUCCESS = '[Users] Load Complete';
export const NEW_USER = '[Users] New';
export const NEW_USER_SUCCESS = '[Users] New User Created';
export const FETCH_USER_SUCCESS = '[Users] New User Created';
export const SAVE_USER_SUCCESS = '[Users] New User Created';
export const TOGGLE_USER_LIST_ORDER = '[Users] Toggle List Order';
export const FILTER_USER_LIST = '[Users] Filter List';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;
  constructor(public payload: string) {}
}

export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;
  constructor(public payload: User) {}
}

export class NewUser implements Action {
  readonly type = NEW_USER;
}

export class NewUserSuccess implements Action {
  readonly type = NEW_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class FetchUserSuccess implements Action {
  readonly type = FETCH_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class SaveUserSuccess implements Action {
  readonly type = SAVE_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class ToggleUserListOrder implements Action {
  readonly type = TOGGLE_USER_LIST_ORDER;
}

export class FilterUserList implements Action {
  readonly type = FILTER_USER_LIST;
  constructor(public payload: string) {}
}

const BASE_URL = environment.apiBaseUrl;
const MODEL_TYPE = 'user';


@Injectable()
export class UsersActions {

  constructor(private store: Store<State>, private http: HttpClient, private router: Router) {
  }

  async fetchAllUsers() {

    const query = {
      selector: {
        _id: { '$gt': 0},
        modelType: MODEL_TYPE
      }
    };

    const body: any = await this.http.post(`${BASE_URL}/_find`, query).toPromise();
    this.store.dispatch(new LoadUsersSuccess(body.docs));

  }

  newUser() {
    this.store.dispatch(new NewUser());
  }

  async _fetchUser(username: string) {

    const query = {
      selector: {
        modelType: MODEL_TYPE,
        username: username
      }
    };

    const body: any = await this.http.post(`${BASE_URL}/_find`, query).toPromise();
    const user: User = Object.assign(new User(), body.docs[0]);

    return user;
  }

  async _fetchUserActivities(activityIds: Array<string>) {

    const query = {
      selector: {
        modelType: 'activity',
        _id: {
          $in: activityIds
        }
      }
    };

    const body: any = await this.http.post(`${BASE_URL}/_find`, query).toPromise();
    return body.docs;

  }

  async fetchUser(username: string) {

    const user = await this._fetchUser(username);
    const activityIds = user.bountyClaims.map( b => b.activity._id );
    const userActivities = await this._fetchUserActivities(activityIds);

    // TODO: map
    user.bountyClaims = userActivities.map( a => {
      return { activity: a };
    });

    this.store.dispatch(new FetchUserSuccess(user));

  }

  async signUp(user: User, password) {

    const { username, ...metadata } = user;

    try {

      await db.signup(username, password);
      await this.http.post(BASE_URL, user).toPromise();

      this.store.dispatch(new NewUserSuccess(user));
      this.redirectToList();

    } catch (err) {
      // TODO: alert error
      console.log(err);
    }

  }

  _saveUser(user: User) {
    return db.put(user).then(() => user);
  }

  async saveUser(user: User) {

    await this._saveUser(user);
    this.store.dispatch(new SaveUserSuccess(user));
    this.redirectToList();

  }

  redirectToList() {
    this.router.navigate(['/users']);
  }

  claimBounty(activity: Activity) {

    const _claim = async (loggedUser) => {

      // Fetch latest version of user
      const user = await this._fetchUser(loggedUser.username);
      const userActivityIds = user.bountyClaims.map( b => b.activity._id );

      if (!userActivityIds.includes(activity._id)) {
        user.bountyClaims.push( new BountyClaim({ _id: activity._id }) );
      }

      const savedUser = await this._saveUser(user);
      this.store.dispatch(new SaveUserSuccess(savedUser));

    };

    this.store.select(fromAuth.getLoggedUser).subscribe(_claim);

  }

  toggleSortOrder() {
    this.store.dispatch(new ToggleUserListOrder());
  }

  applyUserListFilters(searchstring) {
    this.store.dispatch(new FilterUserList(searchstring));
  }
}
