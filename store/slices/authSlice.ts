import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types';
import { normalizeToken, normalizeBoolean } from '@/lib/utils/authUtils';

const initialState: AuthState = {
  user: null,
  jwtToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ 
        user: User | null; 
        jwtToken?: string | null; 
        refreshToken?: string | null;
        isAuthenticated?: boolean | string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.jwtToken = normalizeToken(action.payload.jwtToken ?? state.jwtToken);
      state.refreshToken = normalizeToken(action.payload.refreshToken ?? state.refreshToken);
      const isAuth = action.payload.isAuthenticated ?? !!(action.payload.jwtToken || state.jwtToken);
      state.isAuthenticated = normalizeBoolean(isAuth);
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.jwtToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, logout, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
