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
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import registrationReducer from './slices/registrationSlice';

// Persistence configuration for registration slice only
const registrationPersistConfig = {
  key: 'registration',
  storage,
  whitelist: ['verifiedEmail', 'contractCode', 'registrationData', 'startingStep', 'isInProgress'],
};

// Root reducer with persisted registration
const rootReducer = combineReducers({
  auth: authReducer,
  registration: persistReducer(registrationPersistConfig, registrationReducer),
});

let activeStore: any = null;

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV !== 'production',
  });
  const persistor = persistStore(store);
  activeStore = store;
  return { store, persistor };
};

export const getStore = () => activeStore;

// Inferred types
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['store']['getState']>;
export type AppDispatch = AppStore['store']['dispatch'];

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
