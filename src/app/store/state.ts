import { AuthState, authReducer } from '../+auth/reducers/auth.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { CategoryState, categoryReducer } from '../+transaction/reducers/category.reducers';
import { SubcategoryState, subcategoryReducer } from '../+transaction/reducers/subcategory.reducers';

export interface AppState {
    auth: AuthState;
    category: CategoryState;
    subcategory: SubcategoryState;
}

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getCategoryState = createFeatureSelector<CategoryState>('category');
export const getSubcategoryState = createFeatureSelector<SubcategoryState>('subcategory');

export const APP_REDUCERS: ActionReducerMap<AppState> = {
    auth: authReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
  };