import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENTICATED = '[Auth] Set Unauthenticated';

export class IsAuthenticated implements Action {
	readonly type = SET_AUTHENTICATED;
}

export class IsUnauthenticated implements Action {
	readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = IsAuthenticated | IsUnauthenticated;
