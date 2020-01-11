import { Action } from '@ngrx/store';
import { Category } from '../transaction/model/categroy';
import { Subcategory } from '../transaction/model/subcategory';

export enum ActionTypes {
    GetSubcategories = '[Subcategories] Get',
    GetSubcategoriesSuccess = '[Subcategories] Get Success',
    GetSubcategoriesFailed = '[Subcategories] Get Failed',

    AddSubcategories = '[Subcategories] Add',
    AddSubcategoriesSuccess = '[Subcategories] Add Success',
    AddSubcategoriesFailed = '[Subcategories] Add Failed',

    EditSubcategories = '[Subcategories] Edit',
    EditSubcategoriesSuccess = '[Subcategories] Edit Success',
    EditSubcategoriesFailed = '[Subcategories] Edit Failed',

    DeleteSubcategories = '[Subcategories] Delete',
    DeleteSubcategoriesSuccess = '[Subcategories] Delete Success',
    DeleteSubcategoriesFailed = '[Subcategories] Delete Failed',
}

export class GetSubcategories implements Action {
    readonly type = ActionTypes.GetSubcategories;

    constructor() { }
}

export class GetSubcategoriesSuccess implements Action {
    readonly type = ActionTypes.GetSubcategoriesSuccess;

    constructor(public payload: Category[]) { }
}

export class GetSubcategoriesFailed implements Action {
    readonly type = ActionTypes.GetSubcategoriesFailed;

    constructor(public payload: any) { }
}

export class AddSubcategories implements Action {
    readonly type = ActionTypes.AddSubcategories;

    constructor(public payload: Category) { }
}

export class AddSubcategoriesSuccess implements Action {
    readonly type = ActionTypes.AddSubcategoriesSuccess;

    constructor() { }
}

export class AddSubcategoriesFailed implements Action {
    readonly type = ActionTypes.AddSubcategoriesFailed;

    constructor(public payload: any) { }
}

export class EditSubcategories implements Action {
    readonly type = ActionTypes.EditSubcategories;

    constructor(public payload: Subcategory) { }
}

export class EditSubcategoriesSuccess implements Action {
    readonly type = ActionTypes.EditSubcategoriesSuccess;

    constructor() { }
}

export class EditSubcategoriesFailed implements Action {
    readonly type = ActionTypes.EditSubcategoriesFailed;

    constructor(public payload: any) { }
}

export class DeleteSubcategories implements Action {
    readonly type = ActionTypes.DeleteSubcategories;

    constructor(public payload: Subcategory) { }
}

export class DeleteSubcategoriesSuccess implements Action {
    readonly type = ActionTypes.DeleteSubcategoriesSuccess;

    constructor() { }
}

export class DeleteSubcategoriesFailed implements Action {
    readonly type = ActionTypes.DeleteSubcategoriesFailed;

    constructor(public payload: any) { }
}

export type ActionsUnion = 
GetSubcategories | GetSubcategoriesSuccess | GetSubcategoriesFailed |
AddSubcategories | AddSubcategoriesSuccess | AddSubcategoriesFailed |
EditSubcategories | EditSubcategoriesSuccess | EditSubcategoriesFailed |
DeleteSubcategories | DeleteSubcategoriesSuccess | DeleteSubcategoriesFailed;