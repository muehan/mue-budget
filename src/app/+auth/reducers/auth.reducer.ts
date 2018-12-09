import { AuthActions } from '../actions';
import { createSelector } from '@ngrx/store';


export interface AuthState {
    userCredential: firebase.auth.UserCredential;
    isLoggingIn: boolean;
    errors: any;
}

export const initialState: AuthState = {
    userCredential: undefined,
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
              userCredential: action.payload,
          };
      }
      case AuthActions.ActionTypes.LoginFailer: {
        return {
            ...state,
            isLoggingIn: false,
            userCredential: undefined,
            errors: action.payload
        };
    }
      default: {
        return state;
      }
    }
  }


export function getAuthLoginSelectors(selectedState: (state: any) => AuthState) {
    return {
        getUser: createSelector(selectedState, (state: AuthState) => state.userCredential.user),
        getIsAuthenticated: createSelector(selectedState, (state: AuthState) => state.userCredential != undefined),
        getLoggingInProgress: createSelector(selectedState, (state: AuthState) => state.isLoggingIn),
        getErrors: createSelector(selectedState, (state: AuthState) => state.errors),
    };
}