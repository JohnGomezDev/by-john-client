import type { IAuthAdmin } from '@/modules/auth/types/auth.types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface IAuthState {
  accessToken: string | null;
  user: IAuthAdmin | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  sessionError: string | null;
}

const initialState: IAuthState = {
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isInitializing: true,
  sessionError: null,
};

interface ISetAuthPayload {
  accessToken: string;
  user: IAuthAdmin;
}

interface ISetInitializedPayload {
  sessionError: string | null;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<ISetAuthPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setInitialized: (state, action: PayloadAction<ISetInitializedPayload>) => {
      state.isInitializing = false;
      state.sessionError = action.payload.sessionError;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setAccessToken, setInitialized, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
