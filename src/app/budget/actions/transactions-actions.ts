import { Action } from '@ngrx/store';
import { Transaction } from '../transaction/model/transaction';

export enum ActionTypes {
    GetTransactions = '[Transactions] Get',
    GetTransactionsSuccess = '[Transactions] Get Success',
    GetTransactionsFailed = '[Transactions] Get Failed',

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

export class GetTransactions implements Action {
    readonly type = ActionTypes.GetTransactions;

    constructor() { }
}

export class GetTransactionsSuccess implements Action {
    readonly type = ActionTypes.GetTransactionsSuccess;

    constructor(public payload: Transaction[]) { }
}

export class GetTransactionsFailed implements Action {
    readonly type = ActionTypes.GetTransactionsFailed;

    constructor(public payload: any) { }
}

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
GetTransactions | GetTransactionsSuccess | GetTransactionsFailed |
AddTransactions | AddTransactionsSuccess | AddTransactionsFailed |
EditTransactions | EditTransactionsSuccess | EditTransactionsFailed |
DeleteTransactions | DeleteTransactionsSuccess | DeleteTransactionsFailed;