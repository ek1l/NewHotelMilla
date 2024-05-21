import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import getAllCountrySlice from './reducers/getAllCountry';
import getAllHotelsSlice from './reducers/getAllHotels';
import getAllSportsSlice from './reducers/getAllSports';

const store = configureStore({
  reducer: {
    getAllCountrySlice: getAllCountrySlice,
    getAllHotelsSlice: getAllHotelsSlice,
    getAllSportsSlice: getAllSportsSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
