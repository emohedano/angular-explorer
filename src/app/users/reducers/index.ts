import { User } from './../models/user.model';
import * as user from '../actions/users.actions';
import * as fromRoot from '../../reducers';

/*
  STATE INTERFACE
*/

export interface UsersList {
  users: Array<User>;
}

export interface UserDetail {
  selectedUser: User;
}

export interface UsersState {
  list: UsersList;
  detail: UserDetail;
}

export interface State extends fromRoot.State {
  users: UsersState;
}

/*
  STATE REDUCERS
*/

const DEFAULT_STATE = {
  LIST: {
    users: []
  },
  DETAIL: {
    selectedUser: new User()
  }
};

export function listReducer(state = DEFAULT_STATE.LIST, { type, payload }): UsersList {

  switch (type) {
    case user.LOAD_USERS_SUCCESS:
      return {...state, users: payload };
    default:
      return state;
  }
}

export function detailReducer(state = DEFAULT_STATE.DETAIL, { type, payload }): UserDetail {

  switch (type) {
    case user.NEW_USER:
      return {...state, selectedUser: new User() };
    case user.FETCH_USER_SUCCESS:
      return {...state, selectedUser: payload };
    default:
      return state;
  }
}

export const reducers = {
  list: listReducer,
  detail: detailReducer
};

/*
  STATE SELECTORS
*/

export const getAllUsers = (appState) => appState.users.list.users;
export const getSelectedUser = (appState) => appState.users.detail.selectedUser;
