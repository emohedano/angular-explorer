import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { State } from './../../../auth/reducers/index';
import * as fromUser from '../../reducers';
import { UsersActions } from './../../actions/users.actions';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  isNew = false;
  user: User = new User();
  password: string;
  passwordConfirm: string;
  routeSub: any;
  frm: FormGroup;
  user$: Observable<User>;

  constructor(
    fb: FormBuilder,
    private route: ActivatedRoute,
    private store: Store<State>,
    private actions: UsersActions
  ) {

    this.frm = fb.group({
      username : ['', Validators.required],
      name : ['', Validators.required],
      password : [''],
      passwordConfirm : ['']
    });

    this.user$ = this.store.select(fromUser.getSelectedUser);
    this.user$.subscribe( user  => this.user = user );

  }

  ngOnInit() {

    this.routeSub = this.route.params.subscribe(params => {

      const userId = params['id'];

      if (userId !== 'new') {
        this.frm.controls['username'].disable({ onlySelf: true});
        this.actions.fetchUser(userId);
      } else {
        this.actions.newUser();
        this.isNew = true;
        this.setNewUserValidators();
      }

    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  setNewUserValidators() {
    this.frm.controls['password'].setValidators(Validators.required);
    this.frm.controls['passwordConfirm'].setValidators(this.passwordsMatchValidator.bind(this));
  }

  signUp() {
    this.actions.signUp(this.user, this.password);
  }

  onSubmit(value: any) {

    if (this.isNew) {
      this.signUp();
      return;
    }

    const user = { ...this.user, ...value };
    this.actions.saveUser(user);

  }

  passwordsMatchValidator(control: FormControl) {

    const password = this.password;

    if (control.value !== password) {
      return { passwordsMissmatch: true };
    }
  }
}
