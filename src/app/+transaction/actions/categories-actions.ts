import { Action } from '@ngrx/store';
import { Category } from '../model/categroy';

export enum ActionTypes {
    GetCategories = '[Categories] Get',
    GetCategoriesSuccess = '[Categories] Get Success',
    GetCategoriesFailed = '[Categories] Get Failed',
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


export type ActionsUnion = GetCategories | GetCategoriesSuccess | GetCategoriesFailed;