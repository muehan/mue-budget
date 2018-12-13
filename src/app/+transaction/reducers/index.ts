import { getCategorySelectors } from './category.reducers';
import { getCategoryState, getSubcategoryState } from '../../store/state';
import { getSubcategorySelectors } from './subcategory.reducers';

/* Categories */
export const {
  getAll: getAllCategories,
  getIsLoading: getCategoryIsLoading,
} = getCategorySelectors(getCategoryState);

/* Subcategories */
export const {
  getAll: getAllSubcategories,
  getIsLoading: getSubcategoryIsLoading,
} = getSubcategorySelectors(getSubcategoryState);
