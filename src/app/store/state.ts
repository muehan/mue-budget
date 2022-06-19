import { AuthState, authReducer } from '../+auth/reducers/auth.reducer';
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

export interface AppState {
    auth: AuthState;
}

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const APP_REDUCERS: ActionReducerMap<AppState> = {
    auth: authReducer,
};