import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import getAllCountrySlice from './reducers/getAllCountry';
import getAllhotelsSlice from './reducers/getAllHotels';
import getAllSportsSlice from './reducers/getAllSports';
import getAllnewsSlice from './reducers/getAllNews';
import sendEmailMailChimpSlice from './reducers/sendEmail';

const store = configureStore({
  reducer: {
    getAllCountrySlice: getAllCountrySlice,
    getAllhotelsSlice: getAllhotelsSlice,
    getAllSportsSlice: getAllSportsSlice,
    getAllnewsSlice: getAllnewsSlice,
    sendEmailMailChimpSlice: sendEmailMailChimpSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
