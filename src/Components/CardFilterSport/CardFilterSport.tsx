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
      query += `rating=${selectedRatingFilter}&`;
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
      dispatch(removeTextParam('rating'));
    } else {
      setSelectedRatingFilter(filterId);
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
        data.map((filter: any) => (
          <div key={filter.id} className={styles.filter}>
            <label className={styles.label}>
              {filter.facility && (
                <>
                  <input
                    value={filter.facility}
                    style={{
                      width: modalFilter ? '20px' : '15px',
                      height: modalFilter ? '20px' : '15px',
                    }}
                    type="checkbox"
                    checked={filter.id === selectedFacilityFilter}
                    onChange={() => handleFacilityCheckboxChange(filter.id)}
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
                    {filter.facility}
                  </span>
                </>
              )}
              {filter.sport && (
                <>
                  <input
                    value={filter.sport}
                    style={{
                      width: modalFilter ? '20px' : '15px',
                      height: modalFilter ? '20px' : '15px',
                    }}
                    type="checkbox"
                    checked={filter.id === selectedSportFilter}
                    onChange={() => handleSportCheckboxChange(filter.id)}
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
                    {filter.sport}
                  </span>
                </>
              )}
              {filter.condition && (
                <>
                  <input
                    style={{
                      width: modalFilter ? '20px' : '15px',
                      height: modalFilter ? '20px' : '15px',
                    }}
                    type="checkbox"
                    value={filter.condition}
                    checked={filter.id === selectedConditionFilter}
                    onChange={() => handleConditionCheckboxChange(filter.id)}
                  />
                  <span
                    className={styles.checkbox}
                    style={{
                      color: modalFilter ? 'white' : '#11072d',
                      fontSize: modalFilter ? '24px' : '14px',
                    }}
                  ></span>
                  <span
                    style={{
                      color: modalFilter ? 'white' : '#11072d',
                      fontSize: modalFilter ? '24px' : '14px',
                    }}
                  >
                    {filter.condition}
                  </span>
                </>
              )}
              {filter.travelTime && (
                <>
                  <input
                    style={{
                      width: modalFilter ? '20px' : '15px',
                      height: modalFilter ? '20px' : '15px',
                    }}
                    type="checkbox"
                    value={filter.travelTime}
                    checked={filter.id === selectedTravelTimeFilter}
                    onChange={() => handleTravelTimeCheckboxChange(filter.id)}
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
                    {filter.travelTime}
                  </span>
                </>
              )}
              {filter.rating && (
                <>
                  <input
                    style={{
                      width: modalFilter ? '20px' : '15px',
                      height: modalFilter ? '20px' : '15px',
                    }}
                    type="checkbox"
                    value={filter.rating}
                    checked={filter.id === selectedRatingFilter}
                    onChange={() => handleRatingCheckboxChange(filter.id)}
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
                    {filter.rating}
                  </span>
                </>
              )}
            </label>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default Filter;
