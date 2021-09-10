import { getCategorySelectors } from './category.reducers';
import { getCategoryState, getSubcategoryState, getTransactionState } from '../../store/state';
import { getSubcategorySelectors } from './subcategory.reducers';
import { getTransactionSelectors } from './transaction.reducers';

/* Categories */
export const {
  getAll: getAllCategories,
  getIsLoading: getCategoryIsLoading,
  getCategoriesLoaded: getCategoriesLoaded,
} = getCategorySelectors(getCategoryState);

/* Subcategories */
export const {
  getAll: getAllSubcategories,
  getIsLoading: getSubcategoryIsLoading,
  getSubcategoriesLoaded: getSubcategoriesLoaded,
} = getSubcategorySelectors(getSubcategoryState);

/* Transactions */
export const {
  getAll: getAllTransactions,
  getIsLoading: getTransactionIsLoading,
  getLastFew: getLastFewTransactions,
} = getTransactionSelectors(getTransactionState);