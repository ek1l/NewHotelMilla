import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import getAllCountrySlice from './reducers/getAllCountry';
import getAllhotelsSlice from './reducers/getAllHotels';
import getAllSportsSlice from './reducers/getAllSports';
import getAllnewsSlice from './reducers/getAllNews';
import sendEmailMailChimpSlice from './reducers/sendEmail';
import notifyEmailSendSlice from './reducers/notifyEmailSend';
import getAllPhotosGallerySlice from './reducers/getAllPhotosGallery';
import getAllPlayersSlice from './reducers/getAllPlayers';
import getTextparamsSlice from './reducers/queryParamsSearchHotelsStateGlobal';
import getAllFacilitiesSlice from './reducers/getAllFacilities';
import getAllConditionSlice from './reducers/getAllCondition';
import getAllTravelTimeSlice from './reducers/getAllNewTravelTime';
import getAllRatingsSlice from './reducers/getAllRating';
import changeIdiomaSlice from './reducers/idioma';
const store = configureStore({
  reducer: {
    getAllCountrySlice: getAllCountrySlice,
    getAllhotelsSlice: getAllhotelsSlice,
    getAllSportsSlice: getAllSportsSlice,
    getAllnewsSlice: getAllnewsSlice,
    sendEmailMailChimpSlice: sendEmailMailChimpSlice,
    getAllPhotosGallerySlice: getAllPhotosGallerySlice,
    notifyEmailSendSlice: notifyEmailSendSlice,
    getAllPlayersSlice: getAllPlayersSlice,
    getTextparamsSlice: getTextparamsSlice,
    getAllFacilitiesSlice: getAllFacilitiesSlice,
    getAllConditionSlice: getAllConditionSlice,
    getAllTravelTimeSlice: getAllTravelTimeSlice,
    getAllRatingsSlice: getAllRatingsSlice,
    changeIdiomaSlice: changeIdiomaSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
