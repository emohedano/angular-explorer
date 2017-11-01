import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { State } from '../../reducers';
import { db } from '../../shared/db';
import { User } from '../../users/models/user.model';
import { environment } from '../../../environments/environment';

export const AUTH_LOGIN = '[Auth] Login';
export const AUTH_LOGIN_SUCCESS = '[Auth] Login Complete';
export const AUTH_LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = AUTH_LOGIN;
  constructor(public payload: string) {}
}

export class LoginSuccess implements Action {
  readonly type = AUTH_LOGIN_SUCCESS;
  constructor(public payload: User) {}
}

export class Logout implements Action {
  readonly type = AUTH_LOGOUT;
}

@Injectable()
export class AuthActions {

  constructor(private store: Store<State>, private router: Router, private http: HttpClient) { }

  private fetchUserData(username) {

    const query = {
      selector: {
        modelType: 'user',
        username: username
      }
    };

    return this.http.post(`${environment.apiBaseUrl}/_find`, query).toPromise()
    .then((body: any) => {

      const user = body.docs[0];

      return user;

    });

  }

  login(credentials) {

    db.login(credentials.username, credentials.password)
    .then((data) => {
      return this.fetchUserData(credentials.username);
    })
    .then((user) => {

      this.store.dispatch(new LoginSuccess(user));

      // Reload the current route
      this.router.navigate([this.router.url]);

    });

  }

  logout() {

    return db.logout()
    .then((response) => {

      this.store.dispatch(new Logout());
      this.redirectToHome();
    });

  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  checkActiveSession() {

    db.getSession()
    .then((response) => {

      const currentUser = response.userCtx.name;

      if (currentUser) {

        this.fetchUserData(currentUser)
        .then((user) => {
          this.store.dispatch(new LoginSuccess(user));
        });

      }

    });
  }

}
