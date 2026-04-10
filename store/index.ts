import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
