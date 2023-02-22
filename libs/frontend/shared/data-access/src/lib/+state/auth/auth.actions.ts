import { createAction, props } from '@ngrx/store';
import { ApiError, AuthLoginResponse } from '@chatterly/shared/data-access';

export const loginRequest = createAction('[Auth] Login Request', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ loginSuccessResponse: AuthLoginResponse }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: ApiError }>());
export const logout = createAction('[Auth] Logout');
