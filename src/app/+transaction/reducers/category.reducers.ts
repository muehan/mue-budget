import { CategoryActions } from '../actions';
import { createSelector } from '@ngrx/store';
import { User } from 'firebase';


export interface CategoryState {
    
}

export const initialState: CategoryState = {
    
}

export function authReducer(
    state = initialState,
    action: CategoryActions.ActionsUnion
): CategoryState {
    switch (action.type) {
        case CategoryActions.ActionTypes.GetCategories: {
            return {
                ...state,
            };
        }
        case CategoryActions.ActionTypes.GetCategoriesSuccess: {
            return {
                ...state,
            };
        }
        case CategoryActions.ActionTypes.GetCategoriesFailed: {
            return {
                ...state,
            };
        }
        default: {
            return state;
        }
    }
}


export function getAuthLoginSelectors(selectedState: (state: any) => CategoryState) {
    return {
        
    };
}