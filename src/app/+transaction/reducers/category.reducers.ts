import { CategoryActions } from '../actions';
import { createSelector } from '@ngrx/store';
import { Category } from '../model/categroy';


export interface CategoryState {
    isLoading: boolean;
    categories: Category[];
    errors: any;
}

export const initialState: CategoryState = {
    isLoading: false,
    categories: [],
    errors: undefined,
}

export function categoryReducer(
    state = initialState,
    action: CategoryActions.ActionsUnion
): CategoryState {
    switch (action.type) {
        case CategoryActions.ActionTypes.GetCategories: {
            return {
                isLoading: true,
                ...state,
            };
        }
        case CategoryActions.ActionTypes.GetCategoriesSuccess: {
            return {
                isLoading: false,
                categories: action.payload,
                ...state,
            };
        }
        case CategoryActions.ActionTypes.GetCategoriesFailed:
        case CategoryActions.ActionTypes.AddCategoriesFailed: {
            return {
                isLoading: false,
                errors: action.payload,
                ...state,
            };
        }
        default: {
            return state;
        }
    }
}

export function getCategorySelectors(selectedState: (state: any) => CategoryState) {
    return {
        getAll: createSelector(selectedState, (state: CategoryState) => state.categories),
        getIsLoading: createSelector(selectedState, (state: CategoryState) => state.isLoading)
    };
}