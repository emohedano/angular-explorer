import { Activity } from './../../activities/models/activity.model';

export class BountyClaim {
  activity: Activity;
  validated: boolean;

  constructor(_activity = null, _validated = false) {
    this.activity = _activity;
    this.validated = _validated;
  }
}
