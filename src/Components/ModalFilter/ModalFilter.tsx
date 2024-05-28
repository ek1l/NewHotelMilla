/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';

import styles from './ModalFilter.module.scss'

import FilterCountry from '../FilterCountry/FilterCountry';
import { getAllCondition } from '../../redux/reducers/getAllCondition';
import { getAllTravelTime } from '../../redux/reducers/getAllNewTravelTime';
import { getAllCountry } from '../../redux/reducers/getAllCountry';
import { getAllFacilities } from '../../redux/reducers/getAllFacilities';
import { getAllSports } from '../../redux/reducers/getAllSports';
import Filter from '../CardFilterSport/CardFilterSport';

const ModalFilter = ({ handleSetOpenFilterModal, openFilterModal }: any) => {
  const { dutch } = useAppSelector((state) => state.changeIdiomaSlice);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllSportsSlice);
  const { data: facilitiesData } = useAppSelector(
    (state) => state.getAllFacilitiesSlice,
  );
  const { data: ratingsData } = useAppSelector(
    (state) => state.getAllRatingsSlice,
  );
  const { data: travelTimeData } = useAppSelector(
    (state) => state.getAllTravelTimeSlice,
  );
  const { data: countryData } = useAppSelector(
    (state) => state.getAllCountrySlice,
  );
  const { data: conditionsData } = useAppSelector(
    (state) => state.getAllConditionSlice,
  );
  useEffect(() => {
    if (data.length === 0) {
      dispatch(getAllSports());
    }
    if (facilitiesData.length === 0) {
      dispatch(getAllFacilities());
    }
    if (countryData.length === 0) {
      dispatch(getAllCountry());
    }
    if (conditionsData.length === 0) {
      dispatch(getAllCondition());
    }
    if (travelTimeData.length === 0) {
      dispatch(getAllTravelTime());
    }
  }, [
    conditionsData.length,
    countryData.length,
    data.length,
    dispatch,
    facilitiesData.length,
    travelTimeData.length,
  ]);
  return (
    <div
      style={{ display: openFilterModal ? 'block' : 'none' }}
      className={`${styles.modalFilter} animation`}
    >
      <div className={styles.botaoClose}>
        <button onClick={handleSetOpenFilterModal}>X</button>
      </div>
      <div className={styles.filterbyText}>
        <h2>{dutch ? 'Filter op' : 'Filter By'}</h2>
      </div>
      <div className={styles.containerFilter}>
        <div className={styles.filter}>
          <h2>{dutch ? 'Sport' : 'Sport'}</h2>
          <Filter data={data} modalFilter={true} />
        </div>
        <div className={styles.filter}>
          <h2>{dutch ? 'Beoordeling' : 'Rating'}</h2>
          <Filter data={ratingsData} modalFilter={true} />
        </div>
        <div className={styles.filter}>
          <h2>{dutch ? 'Faciliteiten' : 'Facilities'}</h2>
          <Filter data={facilitiesData} modalFilter={true} />
        </div>
        <div className={styles.filter}>
          <h2>{dutch ? 'Land' : 'Country'}</h2>
          <FilterCountry data={countryData} modalFilter={true} />
        </div>
        <div className={styles.filter}>
          <h2>{dutch ? 'Verzorging' : 'Conditions'}</h2>
          <Filter data={conditionsData} modalFilter={true} />
        </div>
        <div className={styles.filter}>
          <h2>{dutch ? 'Reisduur' : 'Travel Time'}</h2>
          <Filter data={travelTimeData} modalFilter={true} />
        </div>
      </div>
    </div>
  );
};

export default ModalFilter;
