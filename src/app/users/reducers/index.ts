import { User } from './../models/user.model';
import * as user from '../actions/users.actions';
import * as fromRoot from '../../reducers';

/*
  STATE INTERFACE
*/

export interface UsersListFilters {
  searchtext: string;
  sortBy: string;
  sortAsc: boolean;
}

export interface UsersList {
  users: Array<User>;
  allUsers: Array<User>;
  filters: UsersListFilters;
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
  UTIL FUNCTIONS
*/

function sortUsers (users: User[], sortAsc: boolean, sortFilterType: string = 'stars' ): User[] {

  if (sortFilterType === 'stars') {

    if (sortAsc) {
      users.sort((a, b) => (a.stars > b.stars) ? -1 : 1);
    } else {
      users.sort((a, b) => (a.stars > b.stars) ? 1 : -1);
    }

  }

  return users;
}

function filterUsersByName (users: User[], name: string ): User[] {
  const _name = name.toLocaleLowerCase();
  return users.filter(u => u.name.toLocaleLowerCase().includes(_name));
}


/*
  STATE REDUCERS
*/

const DEFAULT_STATE = {
  LIST: {
    allUsers: [],
    users: [],
    filters: {
      searchtext: '',
      sortBy: 'stars',
      sortAsc: false
    }
  },
  DETAIL: {
    selectedUser: new User()
  }
};

export function listReducer(state = DEFAULT_STATE.LIST, { type, payload }): UsersList {

  switch (type) {

    case user.LOAD_USERS_SUCCESS:
      const users = sortUsers(payload, state.filters.sortAsc);
      return { ...state, allUsers: users, users: users };

    case user.TOGGLE_USER_LIST_ORDER:

      const sortAsc = !state.filters.sortAsc;
      return {
          ...state,
          users: sortUsers(state.users, sortAsc),
          filters: { ...state.filters, sortAsc: sortAsc }
        };

    case user.FILTER_USER_LIST:

      return {
        ...state,
        users: filterUsersByName(state.allUsers, payload),
        filters: { ...state.filters, searchtext: payload }
      };

    default:
      return state;
  }
}

export function detailReducer(state = DEFAULT_STATE.DETAIL, { type, payload }): UserDetail {

  switch (type) {
    case user.NEW_USER:
      return { ...state, selectedUser: new User() };
    case user.FETCH_USER_SUCCESS:
      return { ...state, selectedUser: payload };
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

export const getAllUsers = (appState) => appState.users.list.allUsers;
export const getFilteredUsers = (appState) => appState.users.list.users;
export const getSelectedUser = (appState) => appState.users.detail.selectedUser;
export const getListFilters = (appState) => appState.users.list.filters;
