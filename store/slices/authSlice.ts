import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types';

const initialState: AuthState = {
  jwtToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ jwtToken: string; user?: User | null }>,
    ) => {
      state.jwtToken = action.payload.jwtToken;
      state.user = action.payload.user || null;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.jwtToken = action.payload;
    },
    logout: (state) => {
      state.jwtToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCredentials, setJwtToken, logout, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
