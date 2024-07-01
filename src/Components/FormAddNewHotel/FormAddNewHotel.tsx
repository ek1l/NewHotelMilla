/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import InputTextArea from '../InputTextArea/InputTextArea';
import styles from './FormAddNewHotel.module.scss';
import CloseModalIMG from '../../assets/img/closeModalIMG.svg';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { toggleModalAdminFunction } from '../../redux/reducers/toggleModalFormAdmin';
import { getAllCountry } from '../../redux/reducers/getAllCountry';
import { getAllSports } from '../../redux/reducers/getAllSports';
import { getAllhotels } from '../../redux/reducers/getAllHotels';
import { getAllRatings } from '../../redux/reducers/getAllRating';
import { getAllCondition } from '../../redux/reducers/getAllCondition';
import { getAllTravelTime } from '../../redux/reducers/getAllNewTravelTime';
import { getAllFacilities } from '../../redux/reducers/getAllFacilities';
import { createHotel } from '../../redux/reducers/createHotel';

const notifySuccessCreated = () => toast.success('Hotel Created successfully');
const notifyErrorCreated = () => toast.error('Hotel not Created');

const FormAddNewHotel = () => {
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
  const { loading } = useAppSelector((state) => state.createHotelsSlice);

  const { register, handleSubmit } = useForm();
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedTravelTimes, setSelectedTravelTimes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [testPromo, setTestPromo] = useState<boolean>(false);
  const [slider_display, setslider_display] = useState<boolean>(false);
  console.log(testPromo);
  const handlePromotion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTestPromo(event.target.checked);
  };

  const handleSliderDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslider_display(event.target.checked);
  };

  const handleToggleModalAdmin = () => {
    dispatch(toggleModalAdminFunction());
  };

  useEffect(() => {
    dispatch(getAllSports());
    dispatch(getAllCountry());
    dispatch(getAllTravelTime());
    dispatch(getAllFacilities());
    dispatch(getAllCondition());
    dispatch(getAllRatings());
  }, [dispatch]);

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
      promotion: testPromo,
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
    };

    const formDataToSend = new FormData();

    formDataToSend.append('name', newObjHotel.name);

    formDataToSend.append(
      'description',
      JSON.stringify(newObjHotel.description),
    );

    formDataToSend.append(
      'description_card',
      JSON.stringify(newObjHotel.description_card),
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

    formDataToSend.append('promotion', String(newObjHotel.promotion));
    console.log('ewqqewqweweq', newObjHotel.promotion);
    formDataToSend.append('slider_display', String(newObjHotel.slider_display));

    formDataToSend.append('ratingId', String(newObjHotel.ratingId));

    formDataToSend.append('author', formData.authors[0]);
    formDataToSend.append('hotelMovie', newObjHotel.hotelMovie[0]);

    if (formData.image && formData.image.length > 0) {
      for (let i = 0; i < formData.image.length; i++) {
        formDataToSend.append('hotel', formData.image[i]);
      }
    }

    const response = await dispatch(createHotel(formDataToSend));

    if (response.type === 'createHotel/fulfilled') {
      notifySuccessCreated();
      handleToggleModalAdmin();
      dispatch(getAllhotels());

      return response;
    } else {
      notifyErrorCreated();
    }
  };

  return (
    <div className={`${styles.container} animationFormModal`}>
      <form onSubmit={handleSubmit(submit)} className={styles.form}>
        <div className={styles.closeButtonContainer}>
          <button onClick={handleToggleModalAdmin}>
            <img src={CloseModalIMG} alt="Close" />
          </button>
        </div>
        <div className={styles.containerForm}>
          <div className={styles.titleContactUs}>
            <h2>Add New Hotel</h2>
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
                  {...register('sportsIds')}
                  onChange={handleSportsChange}
                  required
                >
                  <option value="Select Sports">Select Sports</option>
                  {sportData.length > 0
                    ? sportData.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.sport}
                        </option>
                      ))
                    : null}
                </select>
                <div className={styles.facilitiesSelected}>
                  {selectedSports.map((sportId) => (
                    <div key={sportId} className={styles.selectedFacility}>
                      <p>{`${sportId.slice(0, 4)}...`}</p>
                      <button
                        className={styles.removeButtonSportArray}
                        onClick={() => removeSport(sportId)}
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
                    <div key={conditionId} className={styles.selectedFacility}>
                      <p>{`${conditionId.slice(0, 4)}...`}</p>
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
                      <p>{`${facilityId.slice(0, 4)}...`}</p>
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
                  {...register('travelTimeId')}
                  onChange={handleTravelTimeChange}
                  required
                >
                  <option value="Select Travel Time">Select Travel Time</option>
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
                    <div key={travelTimeId} className={styles.selectedFacility}>
                      <p>{`${travelTimeId.slice(0, 4)}...`}</p>
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
            <div className={styles.textAreaInputsContainer}>
              <InputTextArea
                {...register('description_card')}
                label="Hotel description alone page offers"
              />
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
              <input
                type="checkbox"
                onChange={handlePromotion}
                checked={testPromo}
              />
            </label>
            <label>
              <span className={`${styles.promotion}`}>Best Locations</span>
              <input
                type="checkbox"
                onChange={handleSliderDisplay}
                checked={slider_display}
              />
            </label>

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
                label="Photos"
                type="file"
                accept="image/*"
                {...register('image')}
                multiple
                height="120px"
                width="100%"
              />
              <Input
                label="Video Hotel"
                type="file"
                {...register('hotelMovie')}
                height="120px"
                width="100%"
              />
            </div>
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
    </div>
  );
};

export default FormAddNewHotel;
