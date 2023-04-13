import {
  Action,
  ActionReducer,
  createReducer,
  MetaReducer,
  on,
} from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { ApiError, User } from '@chatterly/shared/data-access';
import jwtDecode from 'jwt-decode';
import * as dayjs from 'dayjs';

export interface AuthState {
  token: string | null;
  user: (User & { profileImageFile?: File }) | null;
  expiresAt: string | null;
  loginError?: ApiError;
  pending: boolean;
}

export const initialState: AuthState = {
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
    const decodedToken = jwtDecode<{ exp: number }>(
      loginSuccessResponse.access_token
    );
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
  }),
  on(AuthActions.userDataRefresh, state => {
    return { ...state };
  }),
  on(AuthActions.userDataRefreshSuccess, (state, { user }) => {
    return { ...state, user };
  })
);

export function authReducer(state = initialState, action: Action) {
  return _authReducer(state, action);
}

export function persistStateReducer(_reducer: ActionReducer<AuthState>) {
  const localStorageKey = '__auth';
  return (state: AuthState | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }

    const nextState = _reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}

function clearStateMetaReducer<AuthState>(
  reducer: ActionReducer<AuthState>
): ActionReducer<AuthState> {
  return (state: AuthState | undefined, action: Action) => {
    if (action.type === '[Auth] Logout') {
      state = {} as AuthState;
    }
    return reducer(state, action);
  };
}
export const metaReducers: Array<MetaReducer<AuthState>> = [
  clearStateMetaReducer,
  persistStateReducer,
];
