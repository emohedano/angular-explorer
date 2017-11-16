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
  listFilters$: Observable<fromUsers.UsersListFilters>;

  constructor(
    private store: Store<State>,
    public actions: UsersActions
  ) {
  }

  ngOnInit(): void {

    this.users$ = this.store.select(fromUsers.getFilteredUsers);
    this.listFilters$ = this.store.select(fromUsers.getListFilters);
    this.isAdminSession$ = this.store.select(fromAuth.isAdminSession);

    this.actions.fetchAllUsers();
  }

  searchUsers(text) {
    this.actions.applyUserListFilters(text);
  }

}
