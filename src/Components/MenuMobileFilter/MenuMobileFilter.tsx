/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import styles from './MenuMobileFilter.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAllSports } from '../../redux/reducers/getAllSports';
import { getAllCountry } from '../../redux/reducers/getAllCountry';
import { getAllFacilities } from '../../redux/reducers/getAllFacilities';
import { getAllCondition } from '../../redux/reducers/getAllCondition';
import { getAllTravelTime } from '../../redux/reducers/getAllNewTravelTime';
import { getAllRatings } from '../../redux/reducers/getAllRating';
import Filter from '../CardFilterSport/CardFilterSport';
import FilterCountry from '../FilterCountry/FilterCountry';
import { toggleMenu } from '../../redux/reducers/menuMobileOpen';

const MenuMobileFilter = () => {
  const dispatch = useAppDispatch();

  const { dutch } = useAppSelector((state) => state.changeIdiomaSlice);
  const { data: sportData } = useAppSelector(
    (state: { getAllSportsSlice: any }) => state.getAllSportsSlice,
  );
  const { data: facilitiesData } = useAppSelector(
    (state: { getAllFacilitiesSlice: any }) => state.getAllFacilitiesSlice,
  );
  const { data: countryData } = useAppSelector(
    (state: { getAllCountrySlice: any }) => state.getAllCountrySlice,
  );
  const { data: conditionsData } = useAppSelector(
    (state: { getAllConditionSlice: any }) => state.getAllConditionSlice,
  );
  const { data: travelTimeData } = useAppSelector(
    (state: { getAllTravelTimeSlice: any }) => state.getAllTravelTimeSlice,
  );
  const { data: ratingsData } = useAppSelector(
    (state: { getAllRatingsSlice: any }) => state.getAllRatingsSlice,
  );

  useEffect(() => {
    if (sportData.length === 0) {
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
    if (ratingsData.length === 0) {
      dispatch(getAllRatings());
    }
  }, [
    sportData.length,
    facilitiesData.length,
    countryData.length,
    conditionsData.length,
    travelTimeData.length,
    ratingsData.length,
    dispatch,
  ]);
  const toggleMenuMobile = () => dispatch(toggleMenu());
  return (
    <div className={`${styles.filter}`}>
      {' '}
      <div className={styles.containerFilter}>
        <div className={styles.titleFilter}>
          <h2>{dutch ? 'Filter' : 'Filter by'}</h2>
          <button
            onClick={toggleMenuMobile}
            className={styles.closeModalMenuMobile}
          >
            X
          </button>
        </div>
        <div className={styles.cardFilter}>
          <h3>{dutch ? 'Sport' : 'Sport'}</h3>
          <Filter modalFilter={false} data={sportData} />
        </div>
        <div className={styles.cardFilter}>
          <h3>{dutch ? 'Beoordeling' : 'Rating'}</h3>
          <Filter modalFilter={false} data={ratingsData} />
        </div>
        <div className={styles.cardFilter}>
          <h3>{dutch ? 'Faciliteiten' : 'Facilities'}</h3>
          <Filter modalFilter={false} data={facilitiesData} />
        </div>
        <div className={styles.cardFilter}>
          <h3>{dutch ? 'Land' : 'Country'}</h3>
          <FilterCountry modalFilter={false} data={countryData} />
        </div>
        <div className={styles.cardFilter}>
          <h3>{dutch ? 'Verzorging' : 'Conditions'}</h3>
          <Filter modalFilter={false} data={conditionsData} />
        </div>
        <div className={styles.cardFilter}>
          <h3>{dutch ? 'Reisduur' : 'Travel time'}</h3>
          <Filter modalFilter={false} data={travelTimeData} />
        </div>
      </div>
    </div>
  );
};

export default MenuMobileFilter;
