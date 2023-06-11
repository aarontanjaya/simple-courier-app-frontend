import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/auth';
import authReducer from './slices/authSlice';
import logger from 'redux-logger';
import { userApi } from '../services/user';
import { Api } from '../services';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      return getDefaultMiddleware().concat(Api.middleware, logger);
    }
    return getDefaultMiddleware().concat(Api.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
