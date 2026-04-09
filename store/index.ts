import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer from './slices/authSlice';

// ── SSR-safe storage ──
// Next.js runs code on the server where localStorage doesn't exist.
// We provide a no-op storage for SSR and real localStorage on the client.
const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: string) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

const storage =
  typeof window !== 'undefined'
    ? require('redux-persist/lib/storage').default
    : createNoopStorage();

// ── Persist config ──
// version: 1 — bumped from default (-1) to auto-purge any old/corrupted data in localStorage.
// whitelist — persisted across page reloads via localStorage.
const authPersistConfig = {
  key: 'auth',
  version: 1,
  storage,
  whitelist: ['isAuthenticated', 'user', 'jwtToken', 'refreshToken'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Required: ignore redux-persist internal action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Inferred types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
