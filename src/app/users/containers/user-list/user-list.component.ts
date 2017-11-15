import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { State } from './../../../reducers';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user.model';
import { UsersActions } from '../../actions/users.actions';
import * as fromUsers from '../../reducers';
import * as fromAuth from '../../../auth/reducers';

@Component({
  selector: 'app-users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: Observable<Array<User>>;
  isAdminSession$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    public actions: UsersActions
  ) {
    this.users$ = this.store.select(fromUsers.getAllUsers);
    this.isAdminSession$ = this.store.select(fromAuth.isAdminSession);
  }

  ngOnInit(): void {
    this.actions.fetchAllUsers();
  }
}
