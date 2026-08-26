import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './slices/auth.slice';
import { uiReducer } from './slices/ui.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
