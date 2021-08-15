import { createAction, props } from "@ngrx/store";
import { Category } from "../transaction/model/categroy";

export const CategoriesInitialize = createAction('[Categories] Init');

export const GetCategories = createAction('[Categories] Get');
export const GetCategoriesSuccess = createAction('[Categories] Get Success', props<{payload: Category[]}>());
export const GetCategoriesFailed = createAction('[Categories] Get Failed', props<{payload: any}>());

export const AddCategorie = createAction('[Categories] Add', props<{payload: Category}>());
export const AddCategoriesSuccess = createAction('[Categories] Add Success');
export const AddCategoriesFailed = createAction('[Categories] Add Failed', props<{payload: any}>());

export const EditCategories = createAction('[Categories] Edit', props<{payload: Category}>());
export const EditCategoriesSuccess = createAction('[Categories] Edit Success');
export const EditCategoriesFailed = createAction('[Categories] Edit Failed', props<{payload: any}>());

export const DeleteCategorie = createAction('[Categories] Delete', props<{payload: Category}>());
export const DeleteCategoriesSuccess = createAction('[Categories] Delete Success');
export const DeleteCategoriesFailed = createAction('[Categories] Delete Failed', props<{payload: any}>());