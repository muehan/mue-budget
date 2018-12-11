import { getCategorySelectors } from './category.reducers';
import { getCategoryState } from '../../store/state';

/* Categories */
export const {
    getAll: getAllCategories,
    getIsLoading: getCategoryIsLoading,
  } = getCategorySelectors(getCategoryState);
  