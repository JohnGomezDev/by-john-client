import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';

import type { TAppDispatch, TRootState } from './index';

export const useAppDispatch = (): TAppDispatch => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
