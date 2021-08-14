import { CategoryActions, SubcategoryActions } from "../actions";
import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Subcategory } from "../transaction/model/subcategory";

export interface SubcategoryState {
  isLoading: boolean;
  Subcategories: Subcategory[];
  errors: any;
}

export const initialState: SubcategoryState = {
  isLoading: false,
  Subcategories: [],
  errors: undefined,
};

const reducer = createReducer(
  initialState,
  on(SubcategoryActions.GetSubcategories, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(SubcategoryActions.GetSubcategoriesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    categories: action.payload,
  })),
  on(SubcategoryActions.DeleteSubcategoriesFailed, (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  })),
  on(SubcategoryActions.GetSubcategoriesFailed, (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  })),
  on(SubcategoryActions.AddSubcategoriesFailed, (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }))
);

export function subcategoryReducer(
  state: SubcategoryState | undefined,
  action: Action
) {
  return reducer(state, action);
}

export function getSubcategorySelectors(
  selectedState: (state: any) => SubcategoryState
) {
  return {
    getAll: createSelector(selectedState, (state: SubcategoryState) =>
      state.Subcategories.sort((a, b) =>
        b.categoryName > a.categoryName ? -1 : 1
      )
    ),
    getIsLoading: createSelector(
      selectedState,
      (state: SubcategoryState) => state.isLoading
    ),
  };
}
