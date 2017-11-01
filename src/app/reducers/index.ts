import { loginReducer } from '../auth/reducers';

export interface State {
  readonly layout: any;
}

export const rootReducer = {
  login: loginReducer
};
