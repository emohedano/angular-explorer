import { loginReducer } from '../auth/reducers';

export interface State {
  version: string;
}

export const rootReducer = {
  login: loginReducer
};
