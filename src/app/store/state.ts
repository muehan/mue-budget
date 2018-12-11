import { AuthState, authReducer } from '../+auth/reducers/auth.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { CategoryState, categoryReducer } from '../+transaction/reducers/category.reducers';

export interface AppState {
    auth: AuthState;
    category: CategoryState;
}

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getCategoryState = createFeatureSelector<CategoryState>('category');

export const APP_REDUCERS: ActionReducerMap<AppState> = {
    auth: authReducer,
    category: categoryReducer,
  };