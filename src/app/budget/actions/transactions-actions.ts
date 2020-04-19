import { Action } from '@ngrx/store';
import { Transaction } from '../transaction/model/transaction';
import { DatabaseSnapshot } from '@angular/fire/database';

export enum ActionTypes {
    GetTransactionChanges = '[Transactions] Get',
    GetTransactionChangesFailed = '[Transactions] Get Failed',

    TransactionAdded = '[Transactions] item added',
    TransactionChanged = '[Transactions] item changed',
    TransactionRemoved = '[Transactions] item removed',

    LoadLastFewTransactions = "[Transactions] LoadLastFew",
    LoadLastFewTransactionsSuccess = "[Transactions] LoadLastFew Success",
    LoadLastFewTransactionsFailed = "[Transactions] LoadLastFew Failed",

    GetAllTransactions = '[Transactions] GetAll',
    GetAllTransactionsSuccess = '[Transactions] GetAll Success',
    GetAllTransactionsFailed = '[Transactions] GetAll Failed',

    AddTransactions = '[Transactions] Add',
    AddTransactionsSuccess = '[Transactions] Add Success',
    AddTransactionsFailed = '[Transactions] Add Failed',

    EditTransactions = '[Transactions] Edit',
    EditTransactionsSuccess = '[Transactions] Edit Success',
    EditTransactionsFailed = '[Transactions] Edit Failed',

    DeleteTransactions = '[Transactions] Delete',
    DeleteTransactionsSuccess = '[Transactions] Delete Success',
    DeleteTransactionsFailed = '[Transactions] Delete Failed',
}

/* GetTransation */
export class GetTransactionChanges implements Action {
    readonly type = ActionTypes.GetTransactionChanges;

    constructor() { }
}

export class GetTransactionChangesFailed implements Action {
    readonly type = ActionTypes.GetTransactionChangesFailed;

    constructor(public payload: any) { }
}

/* GetTransation */
export class TransactionAdded implements Action {
    readonly type = ActionTypes.TransactionAdded;

    constructor(public payload: DatabaseSnapshot<Transaction>) { }
}

export class TransactionChanged implements Action {
    readonly type = ActionTypes.TransactionChanged;

    constructor(public payload: Transaction) { }
}

export class TransactionRemoved implements Action {
    readonly type = ActionTypes.TransactionRemoved;

    constructor(public payload: Transaction) { }
}

/* AddTransaction */
export class AddTransactions implements Action {
    readonly type = ActionTypes.AddTransactions;

    constructor(public payload: Transaction) { }
}

export class AddTransactionsSuccess implements Action {
    readonly type = ActionTypes.AddTransactionsSuccess;

    constructor() { }
}

export class AddTransactionsFailed implements Action {
    readonly type = ActionTypes.AddTransactionsFailed;

    constructor(public payload: any) { }
}

/* GetAllTransaction */
export class GetAllTransactions implements Action {
    readonly type = ActionTypes.GetAllTransactions;

    constructor() { }
}

export class GetAllTransactionsSuccess implements Action {
    readonly type = ActionTypes.GetAllTransactionsSuccess;

    constructor(public payload: Transaction[]) { }
}

export class GetAllTransactionsFailed implements Action {
    readonly type = ActionTypes.GetAllTransactionsFailed;

    constructor(public payload: any) { }
}

/* Get last few Transaction */
export class LoadLastFewTransactions implements Action {
    readonly type = ActionTypes.LoadLastFewTransactions;

    constructor() { }
}

export class LoadLastFewTransactionsSuccess implements Action {
    readonly type = ActionTypes.LoadLastFewTransactionsSuccess;

    constructor(public payload: Transaction[]) { }
}

export class LoadLastFewTransactionsFailed implements Action {
    readonly type = ActionTypes.LoadLastFewTransactionsFailed;

    constructor(public payload: any) { }
}

/* Edit Transation */
export class EditTransactions implements Action {
    readonly type = ActionTypes.EditTransactions;

    constructor(public payload: Transaction) { }
}

export class EditTransactionsSuccess implements Action {
    readonly type = ActionTypes.EditTransactionsSuccess;

    constructor() { }
}

export class EditTransactionsFailed implements Action {
    readonly type = ActionTypes.EditTransactionsFailed;

    constructor(public payload: any) { }
}

/* Delete Transaction */
export class DeleteTransactions implements Action {
    readonly type = ActionTypes.DeleteTransactions;

    constructor(public payload: Transaction) { }
}

export class DeleteTransactionsSuccess implements Action {
    readonly type = ActionTypes.DeleteTransactionsSuccess;

    constructor() { }
}

export class DeleteTransactionsFailed implements Action {
    readonly type = ActionTypes.DeleteTransactionsFailed;

    constructor(public payload: any) { }
}

export type ActionsUnion = 
GetTransactionChanges | GetTransactionChangesFailed |
TransactionAdded | TransactionChanged | TransactionRemoved |
GetAllTransactions | GetAllTransactionsSuccess | GetAllTransactionsFailed |
LoadLastFewTransactions | LoadLastFewTransactionsSuccess | LoadLastFewTransactionsFailed |
AddTransactions | AddTransactionsSuccess | AddTransactionsFailed |
EditTransactions | EditTransactionsSuccess | EditTransactionsFailed |
DeleteTransactions | DeleteTransactionsSuccess | DeleteTransactionsFailed;