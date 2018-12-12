import { Action } from '@ngrx/store';
import { Category } from '../model/categroy';

export enum ActionTypes {
    GetCategories = '[Categories] Get',
    GetCategoriesSuccess = '[Categories] Get Success',
    GetCategoriesFailed = '[Categories] Get Failed',

    AddCategories = '[Categories] Add',
    AddCategoriesSuccess = '[Categories] Add Success',
    AddCategoriesFailed = '[Categories] Add Failed',
}

export class GetCategories implements Action {
    readonly type = ActionTypes.GetCategories;

    constructor() { }
}

export class GetCategoriesSuccess implements Action {
    readonly type = ActionTypes.GetCategoriesSuccess;

    constructor(public payload: Category[]) { }
}

export class GetCategoriesFailed implements Action {
    readonly type = ActionTypes.GetCategoriesFailed;

    constructor(public payload: any) { }
}


export class AddCategories implements Action {
    readonly type = ActionTypes.AddCategories;

    constructor(public payload: Category) { }
}

export class AddCategoriesSuccess implements Action {
    readonly type = ActionTypes.AddCategoriesSuccess;

    constructor() { }
}

export class AddCategoriesFailed implements Action {
    readonly type = ActionTypes.AddCategoriesFailed;

    constructor(public payload: any) { }
}

export type ActionsUnion = 
GetCategories | GetCategoriesSuccess | GetCategoriesFailed |
AddCategories | AddCategoriesSuccess | AddCategoriesFailed;