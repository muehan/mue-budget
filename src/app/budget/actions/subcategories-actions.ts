import { createAction, props } from "@ngrx/store";
import { Subcategory } from '../transaction/model/subcategory';

export const GetSubcategories = createAction('[Subcategories] Get');
export const GetSubcategoriesSuccess = createAction('[Subcategories] Get Success', props<{payload: Subcategory[]}>());
export const GetSubcategoriesFailed = createAction('[Subcategories] Get Failed', props<{payload: any}>());

export const AddSubcategories = createAction('[Subcategories] Add', props<{payload: Subcategory}>());
export const AddSubcategoriesSuccess = createAction('[Subcategories] Add Success');
export const AddSubcategoriesFailed = createAction('[Subcategories] Add Failed', props<{payload: any}>());

export const EditSubcategories = createAction('[Subcategories] Edit', props<{payload: Subcategory}>());
export const EditSubcategoriesSuccess = createAction('[Subcategories] Edit Success');
export const EditSubcategoriesFailed = createAction('[Subcategories] Edit Failed', props<{payload: any}>());

export const DeleteSubcategories = createAction('[Subcategories] Delete', props<{payload: Subcategory}>());
export const DeleteSubcategoriesSuccess = createAction('[Subcategories] Delete Success');
export const DeleteSubcategoriesFailed = createAction('[Subcategories] Delete Failed', props<{payload: any}>());
