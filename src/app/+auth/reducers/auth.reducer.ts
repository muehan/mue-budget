import { AuthActions } from '../actions';
import { createSelector } from '@ngrx/store';
import { User } from 'firebase';


export interface AuthState {
    user: User;
    isLoggingIn: boolean;
    errors: any;
}

export const initialState: AuthState = {
    user: undefined,
    isLoggingIn: false,
    errors: undefined,
}

export function authReducer(
    state = initialState,
    action: AuthActions.ActionsUnion
): AuthState {
    switch (action.type) {
        case AuthActions.ActionTypes.Login: {
            return {
                ...state,
                isLoggingIn: true,
            };
        }
        case AuthActions.ActionTypes.LoginSuccess: {
            return {
                ...state,
                errors: undefined,
                isLoggingIn: false,
                user: action.payload,
            };
        }
        case AuthActions.ActionTypes.LoginFailer: {
            return {
                ...state,
                isLoggingIn: false,
                user: undefined,
                errors: action.payload
            };
        }
        case AuthActions.ActionTypes.Initialize: {
            return {
                ...state,
                isLoggingIn: true,
                user: undefined,
                errors: undefined,
            };
        }
        default: {
            return state;
        }
    }
}


export function getAuthLoginSelectors(selectedState: (state: any) => AuthState) {
    return {
        getUser: createSelector(selectedState, (state: AuthState) => state.user),
        getIsAuthenticated: createSelector(selectedState, (state: AuthState) => state.user != undefined),
        getLoggingInProgress: createSelector(selectedState, (state: AuthState) => state.isLoggingIn),
        getErrors: createSelector(selectedState, (state: AuthState) => state.errors),
    };
}