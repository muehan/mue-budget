import { TransactionActions } from '../actions';
import { createSelector } from '@ngrx/store';
import { Transaction } from '../transaction/model/transaction';

export interface TransactionState {
    lastFewitems: Transaction[];
    items: Transaction[];
    currentDate: Date;
    selectedDate: Date;
    errors: any;
    isLoading: boolean;
}

export const initialState: TransactionState = {
    items: [],
    lastFewitems: [],
    currentDate: new Date(),
    selectedDate: new Date(),
    errors: undefined,
    isLoading: false,
}

export function transactionReducer(
    state = initialState,
    action: TransactionActions.ActionsUnion
): TransactionState {
    switch (action.type) {
        case TransactionActions.ActionTypes.GetAllTransactions: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case TransactionActions.ActionTypes.GetTransactionChanges: {
            return {
                ...state,
            };
        }
        case TransactionActions.ActionTypes.LoadLastFewTransactionsSuccess: {
            console.log("load last few items");
            return {
                ...state,
                lastFewitems: action.payload,
                isLoading: false,
            }
        }
        case TransactionActions.ActionTypes.GetAllTransactionsSuccess: {
            console.log("store all items");
            return {
                ...state,
                items: action.payload,
                isLoading: false,
            }
        }
        case TransactionActions.ActionTypes.TransactionAdded: {
            if (state.items.find(x => x.$key !== action.payload.key) || state.items.find(x => x.$key !== action.payload.key) === undefined) {
                console.log("add item");
                state.items = state.items.concat(action.payload.val());
            }
            return {
                ...state,
            }
        }
        case TransactionActions.ActionTypes.GetAllTransactionsFailed:
            return {
                ...state,
                errors: action.payload,
                isLoading: false,
            };
        case TransactionActions.ActionTypes.LoadLastFewTransactionsFailed:
        case TransactionActions.ActionTypes.DeleteTransactionsFailed:
        case TransactionActions.ActionTypes.GetTransactionChangesFailed:
        case TransactionActions.ActionTypes.AddTransactionsFailed: {
            return {
                ...state,
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
        getAll: createSelector(selectedState, (state: TransactionState) => state.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
        getLastFew: createSelector(selectedState, (state: TransactionState) => state.lastFewitems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())),
        getIsLoading: createSelector(selectedState, (state: TransactionState) => state.isLoading),
    };
}