import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromAuth from './auth/reducers';
import { State } from './reducers/index';
import { User } from './users/models/user.model';
import { Credentials } from './auth/models/credentials.model';
import { AuthActions } from './auth/actions/auth.actions';

@Component({
  selector: 'stars-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  loggedUser$: Observable<User>;
  credentials: Credentials = new Credentials();

  constructor(public actions: AuthActions, private store: Store<State>) {

    this.actions.checkActiveSession();
    this.loggedUser$ = this.store.select(fromAuth.getLoggedUser);

  }

  login() {
    this.actions.login(this.credentials);
  }

}
