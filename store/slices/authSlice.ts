import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types';

const initialState: AuthState = {
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
      action: PayloadAction<{ 
        user: User | null; 
        isAuthenticated?: boolean;
      }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated ?? false;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
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
