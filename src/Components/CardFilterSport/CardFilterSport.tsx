/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import styles from './CardFilterSport.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  getTextParams,
  removeTextParam,
} from '../../redux/reducers/queryParamsSearchHotelsStateGlobal';

const Filter = ({ data, modalFilter }: any) => {
  const [selectedFacilityFilter, setSelectedFacilityFilter] = useState<
    string | null
  >(null);
  const [selectedSportFilter, setSelectedSportFilter] = useState<string | null>(
    null,
  );
  const [selectedConditionFilter, setSelectedConditionFilter] = useState<
    string | null
  >(null);
  const [selectedTravelTimeFilter, setSelectedTravelTimeFilter] = useState<
    string | null
  >(null);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<
    string | null
  >(null);
  const { text } = useAppSelector((state) => state.getTextparamsSlice);
  const [showMoreFacilities, setShowMoreFacilities] = useState(false);
  const [showMoreSports, setShowMoreSports] = useState(false);
  const [showMoreConditions, setShowMoreConditions] = useState(false);
  const [showMoreTravelTimes, setShowMoreTravelTimes] = useState(false);
  const [showMoreRatings, setShowMoreRatings] = useState(false);

  const buildQuery = useCallback(() => {
    let query = '';

    if (selectedFacilityFilter) {
      query += `facilities=${selectedFacilityFilter}&`;
    }
    if (selectedSportFilter) {
      query += `sport=${selectedSportFilter}&`;
    }
    if (selectedConditionFilter) {
      query += `condition=${selectedConditionFilter}&`;
    }
    if (selectedTravelTimeFilter) {
      query += `travelTime=${selectedTravelTimeFilter}&`;
    }
    if (selectedRatingFilter) {
      query += `ratingId=${selectedRatingFilter}&`;
    }
    return query.slice(0, -1);
  }, [
    selectedFacilityFilter,
    selectedSportFilter,
    selectedConditionFilter,
    selectedTravelTimeFilter,
    selectedRatingFilter,
  ]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const query = buildQuery();

    if (query) {
      dispatch(getTextParams(`${query}`));
    }
  }, [dispatch, buildQuery, text]);

  const handleFacilityCheckboxChange = (filterId: string) => {
    if (filterId === selectedFacilityFilter) {
      setSelectedFacilityFilter(null);
      dispatch(removeTextParam('facilities'));
    } else {
      setSelectedFacilityFilter(filterId);
    }
  };

  const handleSportCheckboxChange = (filterId: string) => {
    if (filterId === selectedSportFilter) {
      setSelectedSportFilter(null);
      dispatch(removeTextParam('sport'));
    } else {
      setSelectedSportFilter(filterId);
    }
  };

  const handleConditionCheckboxChange = (filterId: string) => {
    if (filterId === selectedConditionFilter) {
      setSelectedConditionFilter(null);
      dispatch(removeTextParam('condition'));
    } else {
      setSelectedConditionFilter(filterId);
    }
  };

  const handleTravelTimeCheckboxChange = (filterId: string) => {
    if (filterId === selectedTravelTimeFilter) {
      setSelectedTravelTimeFilter(null);
      dispatch(removeTextParam('travelTime'));
    } else {
      setSelectedTravelTimeFilter(filterId);
    }
  };

  const handleRatingCheckboxChange = (filterId: string) => {
    if (filterId === selectedRatingFilter) {
      setSelectedRatingFilter(null);
      dispatch(removeTextParam('ratingid'));
    } else {
      setSelectedRatingFilter(filterId);
    }
  };

  const renderFilters = (filterType: string) => {
    const filteredData = data.filter((filter: any) => filterType in filter);
    const showMoreState =
      filterType === 'facility'
        ? showMoreFacilities
        : filterType === 'sport'
        ? showMoreSports
        : filterType === 'condition'
        ? showMoreConditions
        : filterType === 'travel_time'
        ? showMoreTravelTimes
        : filterType === 'rating' && showMoreRatings;

    const visibleItems = showMoreState ? filteredData.length : 4;

    return filteredData.slice(0, visibleItems).map((filter: any) => (
      <div key={filter.id} className={styles.filter}>
        <label className={styles.label}>
          <input
            value={filter[filterType]}
            style={{
              width: modalFilter ? '20px' : '15px',
              height: modalFilter ? '20px' : '15px',
            }}
            type="checkbox"
            checked={
              (filter.id === selectedFacilityFilter &&
                filterType === 'facility') ||
              (filter.id === selectedSportFilter && filterType === 'sport') ||
              (filter.id === selectedConditionFilter &&
                filterType === 'condition') ||
              (filter.id === selectedTravelTimeFilter &&
                filterType === 'travel_time') ||
              (filter.id === selectedRatingFilter && filterType === 'rating')
            }
            onChange={() => {
              switch (filterType) {
                case 'facility':
                  handleFacilityCheckboxChange(filter.id);
                  break;
                case 'sport':
                  handleSportCheckboxChange(filter.id);
                  break;
                case 'condition':
                  handleConditionCheckboxChange(filter.id);
                  break;
                case 'travel_time':
                  handleTravelTimeCheckboxChange(filter.id);
                  break;
                case 'rating':
                  handleRatingCheckboxChange(filter.id);
                  break;
                default:
                  break;
              }
            }}
          />
          <span
            style={{
              color: modalFilter ? 'white' : '#11072d',
              fontSize: modalFilter ? '24px' : '14px',
            }}
            className={styles.checkbox}
          ></span>
          <span
            style={{
              color: modalFilter ? 'white' : '#11072d',
              fontSize: modalFilter ? '24px' : '14px',
            }}
          >
            {filter[filterType]}
          </span>
        </label>
      </div>
    ));
  };

  const toggleShowMore = (filterType: string) => {
    switch (filterType) {
      case 'facility':
        setShowMoreFacilities(!showMoreFacilities);
        break;
      case 'sport':
        setShowMoreSports(!showMoreSports);
        break;
      case 'condition':
        setShowMoreConditions(!showMoreConditions);
        break;
      case 'travel_time':
        setShowMoreTravelTimes(!showMoreTravelTimes);
        break;
      case 'rating':
        setShowMoreRatings(!showMoreRatings);
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        flexDirection: modalFilter ? 'row' : 'column',
        gap: modalFilter ? '20px' : '5px',
        flexWrap: modalFilter ? 'wrap' : 'nowrap',
        color: modalFilter ? 'white' : '#11072d',
      }}
      className={styles.card}
    >
      {data.length > 0 ? (
        <>
          {renderFilters('facility')}
          {data.filter((filter: any) => 'facility' in filter).length > 4 && (
            <button
              className={styles.buttonShowMore}
              onClick={() => toggleShowMore('facility')}
            >
              {showMoreFacilities ? 'Show Less' : 'Show More'}
            </button>
          )}

          {renderFilters('sport')}
          {data.filter((filter: any) => 'sport' in filter).length > 4 && (
            <button
              className={styles.buttonShowMore}
              onClick={() => toggleShowMore('sport')}
            >
              {showMoreSports ? 'Show Less' : 'Show More'}
            </button>
          )}

          {renderFilters('condition')}
          {data.filter((filter: any) => 'condition' in filter).length > 4 && (
            <button
              className={styles.buttonShowMore}
              onClick={() => toggleShowMore('condition')}
            >
              {showMoreConditions ? 'Show Less' : 'Show More'}
            </button>
          )}

          {renderFilters('travel_time')}
          {data.filter((filter: any) => 'travel_time' in filter).length > 4 && (
            <button
              className={styles.buttonShowMore}
              onClick={() => toggleShowMore('travel_time')}
            >
              {showMoreTravelTimes ? 'Show Less' : 'Show More'}
            </button>
          )}

          {renderFilters('rating')}
          {data.filter((filter: any) => 'rating' in filter).length > 4 && (
            <button
              className={styles.buttonShowMore}
              onClick={() => toggleShowMore('rating')}
            >
              {showMoreRatings ? 'Show Less' : 'Show More'}
            </button>
          )}
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Filter;
