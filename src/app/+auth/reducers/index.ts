import { getAuthLoginSelectors } from './auth.reducer';
import { getAuthState } from 'src/app/store/state';

export const {
    getUser: getUser,
    getIsAuthenticated: getIsAuthenticated,
    getLoggingInProgress: getLoggingInProgress,
    getErrors: getLoginErrors,    
} = getAuthLoginSelectors(getAuthState);
