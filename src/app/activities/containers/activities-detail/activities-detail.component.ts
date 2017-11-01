import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Activity } from '../../models/activity.model';
import { State } from '../../reducers';
import { ActivitiesActions } from './../../actions/activities.actions';
import * as fromActivity from '../../reducers';

const types = [
  { value: 1, text: 'Capacitación' },
  { value: 2, text: 'Cultural' },
  { value: 3, text: 'Interna' }
];

const periodicityTypes = [
  { value: 1, text: 'Recurrente' },
  { value: 2, text: 'Única' }
];

const categories = [
  { value: 1, text: 'Institucional' },
  { value: 2, text: 'Habilidades' },
  { value: 3, text: 'Personal' }
];

@Component({
  selector: 'app-activities-detail',
  templateUrl: './activities-detail.component.html',
  styleUrls: ['./activities-detail.component.scss']
})
export class ActivitiesDetailComponent implements OnInit, OnDestroy {

  isNew = false;
  types: Array<object> = types;
  periodicityTypes: Array<object> = periodicityTypes;
  categories: Array<object> = categories;
  activity: Activity = new Activity();
  activity$: Observable<Activity>;
  routeSub: any;
  frm: FormGroup;

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<State>,
    private actions: ActivitiesActions
  ) {

    this.frm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      comment: [''],
      bounty: ['', Validators.required],
      type: [null, Validators.required],
      periodicity: [null, Validators.required],
      category: [null, Validators.required]
    });

    this.activity$ = this.store.select(fromActivity.getSelectedActivity);
    this.activity$.subscribe( actitivty  => this.activity = actitivty );

  }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {

      const activityId = params['id'];

      if (activityId !== 'new') {
        this.actions.fetchActivity(activityId);
      } else {
        this.actions.newActivity();
        this.isNew = true;
      }

    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onSubmit(value: any) {

    const activity = { ...this.activity, ...value };
    this.actions.saveActivity(activity);

  }

  catalogComparator(a, b) {
    return (a && b) ? b.value === b.value : false;
  }

}
