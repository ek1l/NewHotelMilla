/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import styles from './EditHotel.module.scss';
import CloseModalIMG from '../../assets/img/closeModalIMG.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { getOneHotel, resetHotelData } from '../../redux/reducers/getOneHotel';
import Loading from '../Loader/Loading';
import IMGDeleteButton from '../../assets/img/deleteIco.svg';
import InputTextArea from '../InputTextArea/InputTextArea';
import { getAllFacilities } from '../../redux/reducers/getAllFacilities';
import { getAllSports } from '../../redux/reducers/getAllSports';
import { getAllCountry } from '../../redux/reducers/getAllCountry';
import { getAllTravelTime } from '../../redux/reducers/getAllNewTravelTime';
import { getAllCondition } from '../../redux/reducers/getAllCondition';
import { getAllhotels } from '../../redux/reducers/getAllHotels';
import { getAllRatings } from '../../redux/reducers/getAllRating';
import { editHotel, setIdHotelZero } from '../../redux/reducers/editHotel';
import { deleteImageHotel } from '../../redux/reducers/deleteImageHotel';

const notifySuccessEdited = () => toast.success('Hotel Edited successfully');
const notifyErrorEdited = () => toast.error('Hotel not Edited');

const notifySuccessImageDelete = () =>
  toast.success('Hotel Image Deleted successfully');
const notifyErrorImageDelete = () => toast.error('Hotel Image not Deleted');

const EditHotel = ({ setHandleEditHotel }: any) => {
  const dispatch = useAppDispatch();
  const { data: countryData } = useAppSelector(
    (state) => state.getAllCountrySlice,
  );
  const { data: sportData } = useAppSelector(
    (state) => state.getAllSportsSlice,
  );
  const { data: facilitiesData } = useAppSelector(
    (state) => state.getAllFacilitiesSlice,
  );
  const { data: travelTimeData } = useAppSelector(
    (state) => state.getAllTravelTimeSlice,
  );
  const { data: conditionData } = useAppSelector(
    (state) => state.getAllConditionSlice,
  );
  
  const { data: ratingsData } = useAppSelector(
    (state) => state.getAllRatingsSlice,
  );

  const { data: oneHotelData, loading: loadingOneHotel } = useAppSelector(
    (state: any) => state.getOneHotelSlice,
  );

  const { idHotel, loading } = useAppSelector((state) => state.editHotelSlice);

  const { register, handleSubmit } = useForm<any>({
    values: {
      name: oneHotelData.id ? oneHotelData?.name : '',
      cityId: oneHotelData.id ? oneHotelData.cityId : '',
      ratingId: oneHotelData.id ? oneHotelData.ratingId : '',
      destination: oneHotelData.id ? oneHotelData.description.destination : '',
      accommodation: oneHotelData.id ? oneHotelData.card.description1 : '',
      description1: oneHotelData.id
        ? oneHotelData.description.accommodation
        : '',
      description2: oneHotelData.id ? oneHotelData.card.description2 : '',

      description3: oneHotelData.id ? oneHotelData.card.description3 : '',
      activities: oneHotelData.id ? oneHotelData.description.activities : '',
      nameAuthor: oneHotelData.id
        ? oneHotelData.description.comment.author
        : '',
      comment: oneHotelData.id ? oneHotelData.description.comment.comment : '',
      movie: oneHotelData.id ? oneHotelData.movie : '',
      description_big: oneHotelData.id ? oneHotelData.card.description_big : '',
      title: oneHotelData.id ? oneHotelData.card.title : '',
    },
  });

  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedTravelTimes, setSelectedTravelTimes] = useState<string[]>([]);
  const [slider_display, setslider_display] = useState<boolean>(false);
  const [promotion, setPromotion] = useState(
    oneHotelData?.promotion ? true : false,
  );
  const handlePromotion = () => {
    setPromotion(!promotion);
  };
  const handleSliderDisplay = () => {
    setslider_display(!slider_display);
  };
  const handleSportsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSportId = event.target.value;
    if (
      selectedSportId !== 'Select Sports' &&
      !selectedSports.includes(selectedSportId)
    ) {
      setSelectedSports((prevSports) => [...prevSports, selectedSportId]);
    }
  };

  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedFacilityId = event.target.value;
    if (
      selectedFacilityId !== 'Select Facilities' &&
      !selectedFacilities.includes(selectedFacilityId)
    ) {
      setSelectedFacilities((prevFacilities) => [
        ...prevFacilities,
        selectedFacilityId,
      ]);
    }
  };

  const handleTravelTimeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedTravelTimeId = event.target.value;
    if (
      selectedTravelTimeId !== 'Select Travel Time' &&
      !selectedTravelTimes.includes(selectedTravelTimeId)
    ) {
      setSelectedTravelTimes((prevTravelTimes) => [
        ...prevTravelTimes,
        selectedTravelTimeId,
      ]);
    }
  };

  const handleConditionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedConditionId = event.target.value;
    if (
      selectedConditionId !== 'Select Conditions' &&
      !selectedConditions.includes(selectedConditionId)
    ) {
      setSelectedConditions((prevConditions) => [
        ...prevConditions,
        selectedConditionId,
      ]);
    }
  };

  const removeSport = (sportIdToRemove: string) => {
    setSelectedSports((prevSports) =>
      prevSports.filter((sportId) => sportId !== sportIdToRemove),
    );
  };

  const removeFacility = (facilityIdToRemove: string) => {
    setSelectedFacilities((prevFacilities) =>
      prevFacilities.filter((facilityId) => facilityId !== facilityIdToRemove),
    );
  };

  const removeTravelTime = (travelTimeIdToRemove: string) => {
    setSelectedTravelTimes((prevTravelTimes) =>
      prevTravelTimes.filter(
        (travelTimeId) => travelTimeId !== travelTimeIdToRemove,
      ),
    );
  };

  const removeCondition = (conditionIdToRemove: string) => {
    setSelectedConditions((prevConditions) =>
      prevConditions.filter(
        (conditionId) => conditionId !== conditionIdToRemove,
      ),
    );
  };

  const submit = async (formData: any) => {
    if (formData.name === '') return;
    if (formData.comment === '') return;
    if (formData.destination === '') return;
    if (formData.accommodation === '') return;
    if (formData.activities === '') return;
    if (formData.cityId === '' || formData.cityId === 'Select Citie') return;
    if (
      formData.conditionId === '' ||
      formData.conditionId === 'Select Conditions'
    )
      if (formData.ratingId === '' || formData.ratingId === 'Select Rating')
        return;

    if (formData.travelTimeId === '' || formData.travelTimeId === 'Select Time')
      return;
    if (selectedSports.length === 0) return;

    if (selectedFacilities.length === 0) return;

    if (selectedTravelTimes.length === 0) return;
    if (selectedConditions.length === 0) return;

    const newObjHotel = {
      name: formData.name,
      description: {
        destination: formData.destination,
        accommodation: formData.accommodation,
        activities: formData.activities,
        comment: {
          author: formData.nameAuthor,
          comment: formData.comment,
        },
      },
      slider_display: slider_display,
      description_card: formData.description_card,
      ratingId: formData.ratingId,
      sportsIds: selectedSports.map(String),
      facilitiesIds: selectedFacilities.map(String),
      travelTimesIds: selectedTravelTimes.map(String),
      conditionsIds: selectedConditions.map(String),
      cityId: formData.cityId,
      conditionId: formData.conditionId,
      travelTimeId: formData.travelTimeId,
      hotelMovie: formData.hotelMovie,
      card: {
        title: formData.title,
        description_big: formData.description_big,
        description1: formData.description1,
        description2: formData.description2,
        description3: formData.description3,
      },
      promotion: promotion,
    };

    const formDataToSend = new FormData();
    formDataToSend.append('name', newObjHotel.name);

    formDataToSend.append(
      'description',
      JSON.stringify(newObjHotel.description),
    );

    formDataToSend.append('sports', JSON.stringify(newObjHotel.sportsIds));
    formDataToSend.append('card', JSON.stringify(newObjHotel.card));
    formDataToSend.append(
      'facilities',
      JSON.stringify(newObjHotel.facilitiesIds),
    );

    formDataToSend.append(
      'travelTime',
      JSON.stringify(newObjHotel.travelTimesIds),
    );

    formDataToSend.append(
      'conditions',
      JSON.stringify(newObjHotel.conditionsIds),
    );

    formDataToSend.append('cityId', newObjHotel.cityId);
    formDataToSend.append(
      'promotion',
      String(newObjHotel.promotion === true ? true : false),
    );

    formDataToSend.append('ratingId', String(newObjHotel.ratingId));

    formDataToSend.append('author', formData.authors[0]);
    formDataToSend.append('hotelMovie', newObjHotel.hotelMovie[0]);

    if (formData.image && formData.image.length > 0) {
      for (let i = 0; i < formData.image.length; i++) {
        formDataToSend.append('hotel', formData.image[i]);
      }
    }
    const objToSend = {
      id: idHotel,
      data: formDataToSend,
    };
    // @ts-ignore
    const response = await dispatch(editHotel(objToSend));

    if (response.type === 'editHotel/fulfilled') {
      notifySuccessEdited();
      dispatch(getAllhotels());
      setHandleEditHotel();
      return response;
    } else {
      notifyErrorEdited();
    }
  };

  const handleIdZeroAndCloseModal = () => {
    dispatch(setIdHotelZero());
    dispatch(resetHotelData());
    setHandleEditHotel(false);
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(getOneHotel(idHotel));
    window.scrollTo(0, 0);
    dispatch(getAllSports());
    dispatch(getAllCountry());
    dispatch(getAllTravelTime());
    dispatch(getAllFacilities());
    dispatch(getAllCondition());
    dispatch(getAllRatings());
  }, [dispatch, idHotel]);

  useEffect(() => {
    setSelectedSports(
      oneHotelData.length > 0
        ? oneHotelData[0]?.sport.map(({ id }: any) => id)
        : [],
    );

    setSelectedConditions(
      oneHotelData.length > 0
        ? oneHotelData[0]?.condition.map(({ id }: any) => id)
        : [],
    );

    setSelectedFacilities(
      oneHotelData.length > 0
        ? oneHotelData[0]?.facilities.map(({ id }: any) => id)
        : [],
    );

    setSelectedTravelTimes(
      oneHotelData.length > 0
        ? oneHotelData[0]?.travelTime.map(({ id }: any) => String(id))
        : [],
    );
  }, [oneHotelData]);
  const handleDeleteImageHotel = async (id: number) => {
    //@ts-ignore
    const response = await dispatch(deleteImageHotel(id));

    if (response.type === 'deleteImageHotel/fulfilled') {
      notifySuccessImageDelete();
      //@ts-ignore
      return response;
    } else {
      notifyErrorImageDelete();
    }
  };
  return (
    <div className={`${styles.container} animationFormModal`}>
      <ToastContainer closeOnClick autoClose={2000} />
      {loadingOneHotel ? (
        <div>
          <Loading />
        </div>
      ) : (
        <form onSubmit={handleSubmit(submit)} className={styles.form}>
          <div className={styles.closeButtonContainer}>
            <button onClick={() => handleIdZeroAndCloseModal()}>
              <img src={CloseModalIMG} alt="Close" />
            </button>
          </div>
          <div className={styles.containerForm}>
            <div className={styles.titleContactUs}>
              <h2>Edit Hotel</h2>
            </div>
            <div className={styles.border_bottom}></div>
            <div className={styles.containerInputs}>
              <Input
                {...register('name')}
                label="Hotel Name "
                type="text"
                width="80%"
                height="50px"
              />
              <div className={styles.containerLabelsSelect}>
                <label className={styles.select}>
                  <span>Cities *</span>
                  <select {...register('cityId')} required>
                    <option value="Select Citie">Select Citie</option>
                    {countryData.length > 0
                      ? countryData.map((country) =>
                          country.cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.name}
                            </option>
                          )),
                        )
                      : null}
                  </select>
                </label>

                <label className={styles.select}>
                  <span>Rating *</span>
                  <select {...register('ratingId')} required>
                    <option value="Select Rating">Select Rating</option>
                    {ratingsData.length > 0
                      ? ratingsData.map((rating) => (
                          <option key={rating.id} value={rating.id}>
                            {rating.rating}
                          </option>
                        ))
                      : null}
                  </select>
                </label>

                <label className={styles.select}>
                  <span>Sports *</span>
                  <select
                    // @ts-ignore
                    {...register('sportsIds')}
                    onChange={handleSportsChange}
                    required
                  >
                    <option value="Select Sports">Select Sports</option>
                    {sportData.length > 0
                      ? sportData.map((sport) => {
                          return (
                            <option key={sport.id} value={sport.id}>
                              {sport.sport}
                            </option>
                          );
                        })
                      : null}
                  </select>
                  <div className={styles.facilitiesSelected}>
                    {selectedSports.map((id) => (
                      <div key={id} className={styles.selectedFacility}>
                        <p>{id}</p>
                        <button
                          className={styles.removeButtonSportArray}
                          onClick={() => removeSport(id)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </label>

                <label className={styles.select}>
                  <span>Conditions *</span>
                  <select
                    // @ts-ignore
                    {...register('conditionId')}
                    onChange={handleConditionChange}
                    required
                  >
                    <option value="Select Conditions">Select Conditions</option>
                    {conditionData.length > 0
                      ? conditionData.map((condition) => (
                          <option key={condition.id} value={condition.id}>
                            {condition.condition}
                          </option>
                        ))
                      : null}
                  </select>
                  <div className={styles.facilitiesSelected}>
                    {selectedConditions.map((conditionId) => (
                      <div
                        key={conditionId}
                        className={styles.selectedFacility}
                      >
                        <p>{conditionId}</p>
                        <button
                          className={styles.removeButtonFacilityArray}
                          onClick={() => removeCondition(conditionId)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </label>

                <label className={styles.select}>
                  <span>Facilities *</span>
                  <select
                    // @ts-ignore
                    {...register('facilitiesIds')}
                    onChange={handleFacilitiesChange}
                    required
                  >
                    <option value="Select Facilities">Select Facilities</option>
                    {facilitiesData.length > 0
                      ? facilitiesData.map((facility: any) => (
                          <option key={facility.id} value={facility.id}>
                            {facility.facility}
                          </option>
                        ))
                      : null}
                  </select>
                  <div className={styles.facilitiesSelected}>
                    {selectedFacilities.map((facilityId) => (
                      <div key={facilityId} className={styles.selectedFacility}>
                        <p>{facilityId}</p>
                        <button
                          className={styles.removeButtonFacilityArray}
                          onClick={() => removeFacility(facilityId)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </label>

                <label className={styles.select}>
                  <span>Travel Time *</span>
                  <select
                    // @ts-ignore
                    {...register('travelTimeId')}
                    onChange={handleTravelTimeChange}
                    required
                  >
                    <option value="Select Travel Time">
                      Select Travel Time
                    </option>
                    {travelTimeData.length > 0
                      ? travelTimeData.map((traveltime: any) => (
                          <option key={traveltime.id} value={traveltime.id}>
                            {traveltime.travel_time}
                          </option>
                        ))
                      : null}
                  </select>
                  <div className={styles.facilitiesSelected}>
                    {selectedTravelTimes.map((travelTimeId) => (
                      <div
                        key={travelTimeId}
                        className={styles.selectedFacility}
                      >
                        <p>{travelTimeId}</p>
                        <button
                          className={styles.removeButtonFacilityArray}
                          onClick={() => removeTravelTime(travelTimeId)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </label>
              </div>
              <div className={styles.photoInputAuthors}>
                <Input
                  label="Photo Author Comment"
                  type="file"
                  accept="image"
                  //@ts-ignore
                  {...register('authors')}
                  height="120px"
                  width="100%"
                />
                <Input
                  label="Name Author"
                  type="text"
                  {...register('nameAuthor')}
                  height="120px"
                  width="100%"
                />
              </div>
              <div className={styles.textAreaInputsContainer}>
                <InputTextArea {...register('comment')} label="Comment" />
              </div>

              <div className={styles.textAreaInputsContainer}>
                <Input
                  label="Description card 1"
                  type="text"
                  {...register('description1')}
                  height="120px"
                  width="100%"
                />
                <Input
                  label="Description card 2"
                  type="text"
                  {...register('description2')}
                  height="120px"
                  width="100%"
                />
                <Input
                  label="Description card 3"
                  type="text"
                  {...register('description3')}
                  height="120px"
                  width="100%"
                />
              </div>
              <label>
                <span className={`${styles.promotion}`}>Promotion</span>
                <input type="checkbox" onChange={handlePromotion} />
              </label>

              <label>
                <span className={`${styles.promotion}`}>Best Locations</span>
                <input type="checkbox" onChange={handleSliderDisplay} />
              </label>

              <div className={styles.textAreaInputsContainer}>
                <InputTextArea
                  required
                  {...register('destination')}
                  label="Destination"
                />
                <InputTextArea
                  required
                  {...register('accommodation')}
                  label="Accommodation"
                />
              </div>
              <div className={styles.textAreaInputsContainer}>
                <InputTextArea {...register('activities')} label="Activities" />
              </div>

              <div className={styles.containerFiles}>
                <Input
                  label="Description Big"
                  type="text"
                  {...register('description_big')}
                  height="120px"
                  width="100%"
                />
                <Input
                  label="Title Card"
                  type="text"
                  {...register('title')}
                  height="120px"
                  width="100%"
                />

                <Input
                  label="Add new photo"
                  type="file"
                  accept="image/*"
                  // @ts-ignore
                  {...register('image')}
                  multiple
                  height="120px"
                  width="100%"
                />
              </div>
              <div className={styles.photosHotelImages}>
                {oneHotelData.id
                  ? oneHotelData.images.map((hotel: any) => (
                      <div key={hotel.id} className={styles.imageClosed}>
                        <button
                          onClick={() => handleDeleteImageHotel(hotel.id)}
                        >
                          <img src={IMGDeleteButton} alt="Delete Button Icon" />
                        </button>
                        <img
                          src={
                            hotel.path
                              ? `${import.meta.env.VITE_APP_API_IMAGE}/${
                                  hotel.path
                                }`
                              : ''
                          }
                          alt={hotel.id}
                        />
                      </div>
                    ))
                  : null}
              </div>
              <Input
                label="Video Hotel"
                type="file"
                // @ts-ignore
                {...register('hotelMovie')}
                height="120px"
                width="50%"
              />
              <div className={styles.containerButton}>
                {loading ? (
                  <button disabled type="submit">
                    Sending...
                  </button>
                ) : (
                  <button type="submit">Send</button>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditHotel;
