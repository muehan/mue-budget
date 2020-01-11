import { TransactionActions } from '../actions';
import { createSelector } from '@ngrx/store';
import { Transaction } from '../transaction/model/transaction';

export interface TransactionState {
    isLoading: boolean;
    items: Transaction[];
    
    errors: any;
}

export const initialState: TransactionState = {
    isLoading: false,
    items: [],
    errors: undefined,
}

export function transactionReducer(
    state = initialState,
    action: TransactionActions.ActionsUnion
): TransactionState {
    switch (action.type) {
        case TransactionActions.ActionTypes.GetTransactions: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case TransactionActions.ActionTypes.GetTransactionsSuccess: {
            return {
                ...state,
                isLoading: false,
                items: action.payload,
            };
        }
        case TransactionActions.ActionTypes.DeleteTransactionsFailed:
        case TransactionActions.ActionTypes.GetTransactionsFailed:
        case TransactionActions.ActionTypes.AddTransactionsFailed: {
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export function getTransactionSelectors(selectedState: (state: any) => TransactionState) {
    return {
        getAll: createSelector(selectedState, (state: TransactionState) => state.items.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
        getIsLoading: createSelector(selectedState, (state: TransactionState) => state.isLoading)
    };
}