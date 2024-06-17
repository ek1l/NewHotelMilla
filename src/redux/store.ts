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
import getOneHotelSlice from './reducers/getOneHotel';
import getOneNewsSlice from './reducers/getOneNews';
import getOnePhotoSlice from './reducers/getOnePhotoGallery';
import toggleModalSlice from './reducers/toggleModal';
import verifyTokenSlice from './reducers/verifyToken';
import loginAdminSlice from './reducers/loginPanelAdmin';
import getAllusersSlice from './reducers/getAllUsers';
import deleteUserSlice from './reducers/deleteUser';
import editUserSlice from './reducers/editUser';
import addNewUserSlice from './reducers/addNewUser';
import getOneUserSlice from './reducers/getOneUser';
import deleteImageHotelSlice from './reducers/deleteImageHotel';
import editHotelSlice from './reducers/editHotel';
import toggleModalAdminSlice from './reducers/toggleModalFormAdmin';
import createNewPlayerSlice from './reducers/createNewPlayerTeam';
import deletePlayerTeamSlice from './reducers/deletePlayerTeam';
import createNewCountrySlice from './reducers/createNewCountry';
import editCountrySlice from './reducers/editCountry';
import deleteCountrySlice from './reducers/deleteCountry';
import editCitySlice from './reducers/editCity';
import deleteCitySlice from './reducers/deleteCity';
import createNewCitySlice from './reducers/createNewCity';
import createNewFacilitieSlice from './reducers/createNewFacilitie';
import editFacilitieSlice from './reducers/editFacilitie';
import getOneFacilitieSlice from './reducers/getOneFacilitie';
import deleteFacilitiesSlice from './reducers/deleteFacilitie';
import deleteTravelTimeSlice from './reducers/deleteTravelTime';
import createNewTravelTimeSlice from './reducers/createNewTravelTime';
import createNewConditionSlice from './reducers/createnewCondition';
import deleteConditionSlice from './reducers/deleteCondition';
import deleteSportSlice from './reducers/deleteSport';
import createNewSportSlice from './reducers/createNewSport';
import deleteRatingSlice from './reducers/deleteRating';
import createNewRatingSlice from './reducers/createNewRating';
import createNewPhotoGalerySlice from './reducers/createNewPhotoGalery';
import addNewVideoGallerySlice from './reducers/addNewVideoGallery';
import deletePhotoGalerySlice from './reducers/deletephotogallery';
import deleteNewsSlice from './reducers/deleteNews';
import editNewsSlice from './reducers/editNews';
import createNewsSlice from './reducers/createNews';
import createHotelsSlice from './reducers/createHotel';
import getAllSliderSlice from './reducers/getAllSlider';
import createNewSliderSlice from './reducers/createNewSlider';
import deleteSliderSlice from './reducers/deleteSlider';
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
    loginAdminSlice: loginAdminSlice,
    getTextparamsSlice: getTextparamsSlice,
    getAllFacilitiesSlice: getAllFacilitiesSlice,
    getAllConditionSlice: getAllConditionSlice,
    getAllTravelTimeSlice: getAllTravelTimeSlice,
    getAllRatingsSlice: getAllRatingsSlice,
    changeIdiomaSlice: changeIdiomaSlice,
    getOneHotelSlice: getOneHotelSlice,
    getOneNewsSlice: getOneNewsSlice,
    getOnePhotoSlice: getOnePhotoSlice,
    toggleModalSlice: toggleModalSlice,
    verifyTokenSlice: verifyTokenSlice,
    getAllusersSlice: getAllusersSlice,
    deleteUserSlice: deleteUserSlice,
    editUserSlice: editUserSlice,
    addNewUserSlice: addNewUserSlice,
    getOneUserSlice: getOneUserSlice,
    deleteImageHotelSlice: deleteImageHotelSlice,
    editHotelSlice: editHotelSlice,
    toggleModalAdminSlice: toggleModalAdminSlice,
    createNewPlayerSlice: createNewPlayerSlice,
    deletePlayerTeamSlice: deletePlayerTeamSlice,
    createNewCountrySlice: createNewCountrySlice,
    editCountrySlice: editCountrySlice,
    deleteCountrySlice: deleteCountrySlice,
    editCitySlice: editCitySlice,
    deleteCitySlice: deleteCitySlice,
    createNewCitySlice: createNewCitySlice,
    createNewFacilitieSlice: createNewFacilitieSlice,
    editFacilitieSlice: editFacilitieSlice,
    getOneFacilitieSlice: getOneFacilitieSlice,
    deleteFacilitiesSlice: deleteFacilitiesSlice,
    deleteTravelTimeSlice: deleteTravelTimeSlice,
    createNewTravelTimeSlice: createNewTravelTimeSlice,
    createNewConditionSlice: createNewConditionSlice,
    deleteConditionSlice: deleteConditionSlice,
    deleteSportSlice: deleteSportSlice,
    createNewSportSlice: createNewSportSlice,
    deleteRatingSlice: deleteRatingSlice,
    createNewRatingSlice: createNewRatingSlice,
    createNewPhotoGalerySlice: createNewPhotoGalerySlice,
    addNewVideoGallerySlice: addNewVideoGallerySlice,
    deletePhotoGalerySlice: deletePhotoGalerySlice,
    deleteNewsSlice: deleteNewsSlice,
    editNewsSlice: editNewsSlice,
    createNewsSlice: createNewsSlice,
    createHotelsSlice: createHotelsSlice,
    getAllSliderSlice: getAllSliderSlice,
    createNewSliderSlice: createNewSliderSlice,
    deleteSliderSlice: deleteSliderSlice,
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;

export default store;
