import { AuthActions } from "../actions";
import { Action, createReducer, createSelector, on } from "@ngrx/store";

export interface AuthState {
  user: any;
  isLoggingIn: boolean;
  errors: any;
}

export const initialState: AuthState = {
  user: undefined,
  isLoggingIn: false,
  errors: undefined,
};

const reducer = createReducer(
  initialState,
  on(AuthActions.Initialize, (state) => ({
    ...state,
    isLoggingIn: true,
    user: undefined,
    errors: undefined,
  })),
  on(AuthActions.Login, (state) => ({ ...state, isLoggingIn: true })),
  on(AuthActions.LoginSuccess, (state, payload) => ({
    ...state,
    errors: undefined,
    isLoggingIn: false,
    user: payload,
  })),
  on(AuthActions.LoginFailer, (state, payload) => ({
    ...state,
    isLoggingIn: false,
    user: undefined,
    errors: payload,
  }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}

export function getAuthLoginSelectors(
  selectedState: (state: any) => AuthState
) {
  return {
    getUser: createSelector(selectedState, (state: AuthState) => state.user),
    getIsAuthenticated: createSelector(
      selectedState,
      (state: AuthState) => state.user !== undefined
    ),
    getLoggingInProgress: createSelector(
      selectedState,
      (state: AuthState) => state.isLoggingIn
    ),
    getErrors: createSelector(
      selectedState,
      (state: AuthState) => state.errors
    ),
  };
}
