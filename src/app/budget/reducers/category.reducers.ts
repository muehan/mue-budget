import { CategoryActions } from "../actions";
import { Action, createReducer, createSelector, on } from "@ngrx/store";
import { Category } from "../transaction/model/categroy";

export interface CategoryState {
  isLoading: boolean;
  categories: Category[];
  errors: any;
}

export const initialState: CategoryState = {
  isLoading: false,
  categories: [],
  errors: undefined,
};

const reducer = createReducer(
  initialState,
  on(CategoryActions.GetCategories, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(CategoryActions.GetCategoriesSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    categories: action.payload,
  })),
  on(CategoryActions.DeleteCategoriesFailed, (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  })),
  on(CategoryActions.GetCategoriesFailed, (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  })),
  on(CategoryActions.AddCategoriesFailed, (state, action) => ({
    ...state,
    isLoading: false,
    errors: action.payload,
  }))
);

export function categoryReducer(
  state: CategoryState | undefined,
  action: Action
) {
  return reducer(state, action);
}

export function getCategorySelectors(
  selectedState: (state: any) => CategoryState
) {
  return {
    getAll: createSelector(
      selectedState,
      (state: CategoryState) => state.categories
    ),
    getIsLoading: createSelector(
      selectedState,
      (state: CategoryState) => state.isLoading
    ),
    getCategoriesLoaded: createSelector(
      selectedState,
      (state: CategoryState) => state.categories.length > 0
    )
  };
}
