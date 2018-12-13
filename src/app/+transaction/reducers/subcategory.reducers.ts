import { SubcategoryActions } from '../actions';
import { createSelector } from '@ngrx/store';
import { Subcategory } from '../model/subcategory';

export interface SubcategoryState {
    isLoading: boolean;
    Subcategories: Subcategory[];
    errors: any;
}

export const initialState: SubcategoryState = {
    isLoading: false,
    Subcategories: [],
    errors: undefined,
}

export function subcategoryReducer(
    state = initialState,
    action: SubcategoryActions.ActionsUnion
): SubcategoryState {
    switch (action.type) {
        case SubcategoryActions.ActionTypes.GetSubcategories: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case SubcategoryActions.ActionTypes.GetSubcategoriesSuccess: {
            return {
                ...state,
                isLoading: false,
                Subcategories: action.payload,
            };
        }
        case SubcategoryActions.ActionTypes.DeleteSubcategoriesFailed:
        case SubcategoryActions.ActionTypes.GetSubcategoriesFailed:
        case SubcategoryActions.ActionTypes.AddSubcategoriesFailed: {
            return {
                ...state,
                isLoading: false,
                errors: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export function getSubcategorySelectors(selectedState: (state: any) => SubcategoryState) {
    return {
        getAll: createSelector(selectedState, (state: SubcategoryState) => state.Subcategories),
        getIsLoading: createSelector(selectedState, (state: SubcategoryState) => state.isLoading)
    };
}