import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RegistrationUserData } from '@/types';

export interface RegistrationState {
  verifiedEmail: string | null;
  contractCode: string;
  registrationData: RegistrationUserData | null;
  startingStep: number;
  isInProgress: boolean;
}

const initialState: RegistrationState = {
  verifiedEmail: null,
  contractCode: '',
  registrationData: null,
  startingStep: 1,
  isInProgress: false,
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setRegistrationProgress: (
      state,
      action: PayloadAction<{
        verifiedEmail: string;
        contractCode: string;
        registrationData?: RegistrationUserData;
        startingStep?: number;
      }>,
    ) => {
      state.verifiedEmail = action.payload.verifiedEmail;
      state.contractCode = action.payload.contractCode;
      state.registrationData = action.payload.registrationData || null;
      state.startingStep = action.payload.startingStep || 1;
      state.isInProgress = true;
    },
    updateRegistrationData: (
      state,
      action: PayloadAction<RegistrationUserData>,
    ) => {
      state.registrationData = action.payload;
    },
    updateStartingStep: (
      state,
      action: PayloadAction<number>,
    ) => {
      state.startingStep = action.payload;
    },
    clearRegistration: (state) => {
      state.verifiedEmail = null;
      state.contractCode = '';
      state.registrationData = null;
      state.startingStep = 1;
      state.isInProgress = false;
    },
  },
});

export const {
  setRegistrationProgress,
  updateRegistrationData,
  updateStartingStep,
  clearRegistration,
} = registrationSlice.actions;

export default registrationSlice.reducer;
