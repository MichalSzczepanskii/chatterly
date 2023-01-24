import { Action, ActionReducer, createReducer, MetaReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { ApiError, User } from '@chatterly/shared/data-access';
import jwtDecode from 'jwt-decode';
import * as dayjs from 'dayjs';

export interface State {
  token: string | null;
  user: User | null;
  expiresAt: string | null;
  loginError?: ApiError;
  pending: boolean;
}

export const initialState: State = {
  token: null,
  expiresAt: null,
  user: null,
  pending: false,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.loginRequest, state => {
    return {
      ...state,
      pending: true,
    };
  }),
  on(AuthActions.loginSuccess, (state, { loginSuccessResponse }) => {
    const decodedToken = jwtDecode<{ exp: number }>(loginSuccessResponse.access_token);
    const expiresAt = dayjs.unix(decodedToken.exp).toISOString();
    return {
      ...state,
      token: loginSuccessResponse.access_token,
      user: loginSuccessResponse.user,
      expiresAt: expiresAt,
      pending: false,
    };
  }),
  on(AuthActions.loginFailure, (state, { error }) => {
    return { ...state, loginError: error, token: null, user: null };
  })
);

export function authReducer(state = initialState, action: Action) {
  return _authReducer(state, action);
}

export function persistStateReducer(_reducer: ActionReducer<State>) {
  const localStorageKey = '__auth';
  return (state: State | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }

    const nextState = _reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}
export const metaReducers: Array<MetaReducer<any, any>> = [persistStateReducer];
