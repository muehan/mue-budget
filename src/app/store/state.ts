import { AuthState, authReducer } from '../+auth/reducers/auth.reducer';
import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";
import { CategoryState, categoryReducer } from '../budget/reducers/category.reducers';
import { SubcategoryState, subcategoryReducer } from '../budget/reducers/subcategory.reducers';
import { TransactionState, transactionReducer } from '../budget/reducers/transaction.reducers';

export interface AppState {
    auth: AuthState;
    category: CategoryState;
    subcategory: SubcategoryState;
    transactions: TransactionState;
}

export const getAuthState = createFeatureSelector<AuthState>('auth');
export const getCategoryState = createFeatureSelector<CategoryState>('category');
export const getSubcategoryState = createFeatureSelector<SubcategoryState>('subcategory');
export const getTransactionState = createFeatureSelector<TransactionState>('transactions');

export const APP_REDUCERS: ActionReducerMap<AppState> = {
    auth: authReducer,
    category: categoryReducer,
    subcategory: subcategoryReducer,
    transactions: transactionReducer,
};