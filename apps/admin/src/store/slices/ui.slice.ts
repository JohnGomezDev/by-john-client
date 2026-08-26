import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type TUiTheme = 'light' | 'dark';

export interface IUiState {
  sidebarOpen: boolean;
  theme: TUiTheme;
}

const initialState: IUiState = {
  sidebarOpen: true,
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<TUiTheme>) => {
      state.theme = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
