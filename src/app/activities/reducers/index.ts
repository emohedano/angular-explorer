import { Activity } from './../models/activity.model';
import * as activity from '../actions/activities.actions';
import * as fromRoot from '../../reducers';

/*
  STATE INTERFACE
*/

export interface ActivitiesList {
  activities: Array<Activity>;
}

export interface ActivityDetail {
  selectedActivity: Activity;
}

export interface ActivitiesState {
  list: ActivitiesList;
  detail: ActivityDetail;
}

export interface State extends fromRoot.State {
  activities: ActivitiesState;
}

/*
  STATE REDUCERS
*/

const DEFAULT_STATE = {
  LIST: {
    activities: []
  },
  DETAIL: {
    selectedActivity: new Activity()
  }
};

export function listReducer(state = DEFAULT_STATE.LIST, { type, payload }): ActivitiesList {

  switch (type) {
    case activity.LOAD_ACTIVITIES_SUCCESS:
      return {...state, activities: payload };
    default:
      return state;
  }
}

export function detailReducer(state = DEFAULT_STATE.DETAIL, { type, payload }): ActivityDetail {

  switch (type) {
    case activity.NEW_ACTIVITY:
      return {...state, selectedActivity: new Activity() };
    case activity.FETCH_ACTIVITY_SUCCESS:
      return {...state, selectedActivity: payload };
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

export const getAllActivities = (appState) => appState.activities.list.activities;
export const getSelectedActivity = (appState) => appState.activities.detail.selectedActivity;
