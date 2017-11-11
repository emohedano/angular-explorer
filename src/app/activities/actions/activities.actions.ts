import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

import { db } from './../../shared/db';
import { Activity } from '../models/activity.model';
import { State } from '../../reducers';
import { environment } from '../../../environments/environment';

export const LOAD_ACTIVITIES = '[Activities] Load';
export const LOAD_ACTIVITIES_SUCCESS = '[Activities] Load Complete';
export const NEW_ACTIVITY = '[Activities] New';
export const NEW_ACTIVITY_SUCCESS = '[Activities] New Activity Created';
export const FETCH_ACTIVITY_SUCCESS = '[Activities] New Activity Created';
export const SAVE_ACTIVITY_SUCCESS = '[Activities] New Activity Created';

export class LoadActivities implements Action {
  readonly type = LOAD_ACTIVITIES;
  constructor(public payload: string) {}
}

export class LoadActivitiesSuccess implements Action {
  readonly type = LOAD_ACTIVITIES_SUCCESS;
  constructor(public payload: Activity) {}
}

export class NewActivity implements Action {
  readonly type = NEW_ACTIVITY;
}

export class NewActivitySuccess implements Action {
  readonly type = NEW_ACTIVITY_SUCCESS;
  constructor(public payload: Activity) {}
}

export class FetchActivitySuccess implements Action {
  readonly type = FETCH_ACTIVITY_SUCCESS;
  constructor(public payload: Activity) {}
}

export class SaveActivitySuccess implements Action {
  readonly type = SAVE_ACTIVITY_SUCCESS;
  constructor(public payload: Activity) {}
}

const BASE_URL = environment.apiBaseUrl;
const MODEL_TYPE = 'activity';


@Injectable()
export class ActivitiesActions {

  constructor(private store: Store<State>, private http: HttpClient, private router: Router) {
  }

  async fetchAllActivities() {

    const query = {
      selector: {
        _id: { '$gt': 0},
        modelType: MODEL_TYPE
      }
    };

    const body: any = await this.http.post(`${BASE_URL}/_find`, query).toPromise();
    this.store.dispatch(new LoadActivitiesSuccess(body.docs));

  }

  newActivity() {
    this.store.dispatch(new NewActivity());
  }

  async fetchActivity(activityId: string) {

    const query = {
      selector: {
        modelType: MODEL_TYPE,
        _id: activityId
      }
    };

    const body: any = await this.http.post(`${BASE_URL}/_find`, query).toPromise();

    const activity = body.docs[0];
    if (activity) {
      this.store.dispatch(new FetchActivitySuccess(activity));
    }

    // TODO: handle no activity found

  }

  async saveActivity(activity: Activity) {

    const dispatchSuccess = () => {
      this.store.dispatch(new SaveActivitySuccess(activity));
      this.redirectToList();
    };

    if (activity._id) {

      await db.put(activity);
      dispatchSuccess();

      return;
    }

    await db.post(activity);
    dispatchSuccess();

  }

  redirectToList() {
    this.router.navigate(['/activities']);
  }

}
