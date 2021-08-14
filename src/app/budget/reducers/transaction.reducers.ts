import { TransactionActions } from "../actions";
import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Transaction } from "../transaction/model/transaction";

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
};

const reducer = createReducer(
  initialState,
  on(TransactionActions.GetAllTransactions, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(TransactionActions.GetTransactionChanges, (state, action) => ({
    ...state,
  })),
  on(TransactionActions.LoadLastFewTransactionsSuccess, (state, action) => ({
    ...state,
    lastFewitems: action.payload,
    isLoading: false,
  })),
  on(TransactionActions.GetAllTransactionsSuccess, (state, action) => ({
    ...state,
    items: action.payload,
    isLoading: false,
  })),
  on(TransactionActions.TransactionAdded, (state, action) => {
    if (
      state.items.find((x) => x.$key !== action.payload.key) ||
      state.items.find((x) => x.$key !== action.payload.key) === undefined
    ) {
      console.log("add item");
      state.items = state.items.concat(action.payload.val());
    }
    return {
      ...state,
    };
  }),
  on(TransactionActions.GetAllTransactionsFailed, (state, action) => ({
    ...state,
    errors: action.payload,
    isLoading: false,
  })),
  on(TransactionActions.LoadLastFewTransactionsFailed, (state, action) => ({
    ...state,
    errors: action.payload,
  })),
  on(TransactionActions.DeleteTransactionsFailed, (state, action) => ({
    ...state,
    errors: action.payload,
  })),
  on(TransactionActions.AddTransactionsFailed, (state, action) => ({
    ...state,
    errors: action.payload,
  }))
);

export function transactionReducer(state: TransactionState | undefined, action: Action) {
    return reducer(state, action);
  }

export function getTransactionSelectors(
  selectedState: (state: any) => TransactionState
) {
  return {
    getAll: createSelector(selectedState, (state: TransactionState) =>
      state.items.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    ),
    getLastFew: createSelector(selectedState, (state: TransactionState) =>
      state.lastFewitems.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    ),
    getIsLoading: createSelector(
      selectedState,
      (state: TransactionState) => state.isLoading
    ),
  };
}
