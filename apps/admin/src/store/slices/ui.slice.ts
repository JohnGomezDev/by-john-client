import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TUiTheme = 'light' | 'dark';

export interface IUiState {
  sidebarOpen: boolean;
  theme: TUiTheme;
}

const initialState: IUiState = {
  sidebarOpen: false,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    setTheme: (state, action: PayloadAction<TUiTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, setTheme } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
