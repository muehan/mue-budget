import { CategoryActions, SubcategoryActions } from "../actions";
import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Subcategory } from "../transaction/model/subcategory";

export interface SubcategoryState {
  isLoading: boolean;
  subcategories: Subcategory[];
  errors: any;
}

export const initialState: SubcategoryState = {
  isLoading: false,
  subcategories: [],
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
    subcategories: action.payload,
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
      state.subcategories.slice().sort((a, b) => {
        if(b.categoryName > a.categoryName) return -1;
        if(b.categoryName < a.categoryName) return 1;
        return 0;
      })
    ),
    getIsLoading: createSelector(
      selectedState,
      (state: SubcategoryState) => state.isLoading
    ),
    getSubcategoriesLoaded: createSelector(
      selectedState,
      (state: SubcategoryState) => state.subcategories.length > 0
    )
  };
}
