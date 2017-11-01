import { Action } from '@ngrx/store';

import { AuthActions } from './../actions/auth.actions';
import { User } from './../../users/models/user.model';

import * as auth from '../actions/auth.actions';
import * as fromRoot from '../../reducers';

export interface Login {
  sessionActive: boolean;
  isAdminSession: boolean;
  loggedUser: User;
}

export interface State extends fromRoot.State {
  login: Login;
}

const DEFAULT_STATE = {
  sessionActive: false,
  isAdminSession: false,
  loggedUser: null
};

export function loginReducer(state = DEFAULT_STATE, { type, payload }): Login {

  switch (type) {
    case auth.AUTH_LOGIN_SUCCESS:
      return { ...state, sessionActive: true, loggedUser: payload, isAdminSession: payload.isAdmin };
    case auth.AUTH_LOGOUT:
      return DEFAULT_STATE;
    default:
      return state;
  }
}


export const getLoggedUser = appState => appState.login.loggedUser;
export const isAdminSession = appState => appState.login.isAdminSession;
