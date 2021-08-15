import { createAction, props } from "@ngrx/store";
import { Transaction } from '../transaction/model/transaction';
import { DatabaseSnapshot } from '@angular/fire/database';

export const TransactionInitialize = createAction('[Transactions] Init');

export const GetTransactionChanges = createAction('[Transactions] Get');
export const GetTransactionChangesFailed = createAction('[Transactions] Get Failed');

export const TransactionAdded = createAction('[Transactions] item added', props<{payload: DatabaseSnapshot<Transaction>}>());
export const TransactionChanged = createAction('[Transactions] item changed', props<{payload: Transaction}>());
export const TransactionRemoved = createAction('[Transactions] item removed', props<{payload: Transaction}>());

export const LoadLastFewTransactions = createAction('[Transactions] LoadLastFew');
export const LoadLastFewTransactionsSuccess = createAction('[Transactions] LoadLastFew Success', props<{payload: Transaction[]}>());
export const LoadLastFewTransactionsFailed = createAction('[Transactions] LoadLastFew Failed', props<{payload: any}>());

export const GetAllTransactions = createAction('[Transactions] GetAll');
export const GetAllTransactionsSuccess = createAction('[Transactions] GetAll Success', props<{payload: Transaction[]}>());
export const GetAllTransactionsFailed = createAction('[Transactions] GetAll Failed', props<{payload: any}>());

export const AddTransactions = createAction('[Transactions] Add', props<{payload: Transaction}>());
export const AddTransactionsSuccess = createAction('[Transactions] Add Success');
export const AddTransactionsFailed = createAction('[Transactions] Add Failed', props<{payload: any}>());

export const EditTransactions = createAction('[Transactions] Edit', props<{payload: Transaction}>());
export const EditTransactionsSuccess = createAction('[Transactions] Edit Success');
export const EditTransactionsFailed = createAction('[Transactions] Edit Failed', props<{payload: any}>());

export const DeleteTransactions = createAction('[Transactions] Delete', props<{payload: Transaction}>());
export const DeleteTransactionsSuccess = createAction('[Transactions] Delete Success');
export const DeleteTransactionsFailed = createAction('[Transactions] Delete Failed', props<{payload: any}>());