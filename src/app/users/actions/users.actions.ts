import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { db } from './../../shared/db';
import { User } from '../models/user.model';
import { State } from '../../reducers';
import { environment } from '../../../environments/environment';

export const LOAD_USERS = '[Users] Load';
export const LOAD_USERS_SUCCESS = '[Users] Load Complete';
export const NEW_USER = '[Users] New';
export const NEW_USER_SUCCESS = '[Users] New User Created';
export const FETCH_USER_SUCCESS = '[Users] New User Created';
export const SAVE_USER_SUCCESS = '[Users] New User Created';

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

const BASE_URL = environment.apiBaseUrl;
const MODEL_TYPE = 'user';


@Injectable()
export class UsersActions {

  constructor(private store: Store<State>, private http: HttpClient, private router: Router) {
  }

  fetchAllUsers() {

    const query = {
      selector: {
        _id: { '$gt': 0},
        modelType: MODEL_TYPE
      }
    };

    this.http.post(`${BASE_URL}/_find`, query).toPromise()
    .then((body: any) => {

      this.store.dispatch(new LoadUsersSuccess(body.docs));

    });

  }

  newUser() {
    this.store.dispatch(new NewUser());
  }

  fetchUser(username: string) {

    const query = {
      selector: {
        modelType: MODEL_TYPE,
        username: username
      }
    };

    this.http.post(`${BASE_URL}/_find`, query).toPromise()
    .then((body: any) => {

      const user = body.docs[0];
      if (user) {
        this.store.dispatch(new FetchUserSuccess(user));
      }

      // TODO: handle no user found

    });

  }

  signUp(user: User, password) {

    const { username, ...metadata } = user;

    db.signup(username, password)
    .then((data) => {
      console.log('user', user, BASE_URL);
      return this.http.post(BASE_URL, user).toPromise();
    })
    .then(() => {
      this.store.dispatch(new NewUserSuccess(user));
      this.redirectToList();
    })
    .catch((err) => {
      // TODO: alert error
      console.log(err);
    });

  }

  saveUser(user: User) {

    db.put(user)
    .then(() => {
      this.store.dispatch(new SaveUserSuccess(user));
      this.redirectToList();
    });
  }

  redirectToList() {
    this.router.navigate(['/users']);
  }

}
