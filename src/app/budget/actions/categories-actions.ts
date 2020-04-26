import { Action } from "@ngrx/store";
import { Category } from "../transaction/model/categroy";

export enum ActionTypes {
    GetCategories = '[Categories] Get',
    GetCategoriesSuccess = '[Categories] Get Success',
    GetCategoriesFailed = '[Categories] Get Failed',

    AddCategories = '[Categories] Add',
    AddCategoriesSuccess = '[Categories] Add Success',
    AddCategoriesFailed = '[Categories] Add Failed',

    EditCategories = '[Categories] Edit',
    EditCategoriesSuccess = '[Categories] Edit Success',
    EditCategoriesFailed = '[Categories] Edit Failed',

    DeleteCategories = '[Categories] Delete',
    DeleteCategoriesSuccess = '[Categories] Delete Success',
    DeleteCategoriesFailed = '[Categories] Delete Failed',
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

export class EditCategories implements Action {
    readonly type = ActionTypes.EditCategories;

    constructor(public payload: Category) { }
}

export class EditCategoriesSuccess implements Action {
    readonly type = ActionTypes.EditCategoriesSuccess;

    constructor() { }
}

export class EditCategoriesFailed implements Action {
    readonly type = ActionTypes.EditCategoriesFailed;

    constructor(public payload: any) { }
}

export class DeleteCategories implements Action {
    readonly type = ActionTypes.DeleteCategories;

    constructor(public payload: Category) { }
}

export class DeleteCategoriesSuccess implements Action {
    readonly type = ActionTypes.DeleteCategoriesSuccess;

    constructor() { }
}

export class DeleteCategoriesFailed implements Action {
    readonly type = ActionTypes.DeleteCategoriesFailed;

    constructor(public payload: any) { }
}

export type ActionsUnion = 
GetCategories | GetCategoriesSuccess | GetCategoriesFailed |
AddCategories | AddCategoriesSuccess | AddCategoriesFailed |
EditCategories | EditCategoriesSuccess | EditCategoriesFailed |
DeleteCategories | DeleteCategoriesSuccess | DeleteCategoriesFailed;