/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from 'react';
import styles from './FilterCountry.module.scss';
import { useAppDispatch } from '../../redux/store';
import {
  getTextParams,
  removeTextParam,
} from '../../redux/reducers/queryParamsSearchHotelsStateGlobal';

const FilterCountry = ({ data, modalFilter }: any) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const dispatch = useAppDispatch();

  const handleCountrySelection = (countryId: any) => {
    if (countryId === selectedCountry) {
      setSelectedCountry(null);
      setSelectedCity(null);
      dispatch(removeTextParam('country'));
      dispatch(removeTextParam('city'));
    } else {
      setSelectedCountry(countryId);
      setSelectedCity(null);
      dispatch(getTextParams(`country=${countryId}`));
    }
  };

  const handleCitySelection = (cityId: any) => {
    if (cityId === selectedCity) {
      setSelectedCity(null);
      dispatch(removeTextParam('city'));
    } else {
      setSelectedCity(cityId);
      dispatch(getTextParams(`city=${cityId}`));
    }
  };

  const buildQuery = useCallback(() => {
    let query = '';

    if (selectedCountry !== null) {
      query += `country=${selectedCountry}&`;
    }
    if (selectedCity !== null) {
      query += `city=${selectedCity}&`;
    }

    return query.slice(0, -1);
  }, [selectedCountry, selectedCity]);

  useEffect(() => {
    const query = buildQuery();
    const currentPathname = window.location.pathname;
    const existingQueryIndex = currentPathname.indexOf('?');
    const existingQuery =
      existingQueryIndex !== -1
        ? currentPathname.slice(existingQueryIndex + 1)
        : '';

    const newQuery = existingQuery ? `${existingQuery}&${query}` : query;

    dispatch(getTextParams(newQuery));
  }, [buildQuery, selectedCountry, selectedCity, dispatch]);

  return (
    <div
      style={{
        color: modalFilter ? 'white' : '#11072d',
      }}
      className={styles.containerFilterCountry}
    >
      {data.length > 0 ? (
        <>
          {data.map((country: any) => (
            <div className={styles.envolve} key={country.id}>
              <label
                className={`${styles.label1} ${selectedCountry === country.id ? styles.checked : ''}`}
              >
                <input
                  style={{
                    width: modalFilter ? '20px' : '14px',
                    height: modalFilter ? '20px' : '14px',
                  }}
                  type="checkbox"
                  name="country"
                  checked={country.id === selectedCountry}
                  onChange={() => handleCountrySelection(country.id)}
                />
                <span
                  style={{
                    color: modalFilter ? 'white' : '#11072d',
                    fontSize: modalFilter ? '20px' : '17px',
                  }}
                >
                  {country.name}
                </span>
                {selectedCountry === country.id ? (
                  <span
                    style={{
                      color: modalFilter ? 'white' : '#11072d',
                      fontSize: modalFilter ? '20px' : '17px',
                    }}
                  >
                    &#x25B2;
                  </span>
                ) : (
                  <span
                    style={{
                      color: modalFilter ? 'white' : '#11072d',
                      fontSize: modalFilter ? '20px' : '17px',
                    }}
                  >
                    &#x25BC;
                  </span>
                )}
              </label>
              {selectedCountry === country.id && (
                <div
                  style={{
                    display: modalFilter ? 'flex' : '',
                    justifyContent: modalFilter ? 'flex-start' : 'center',
                    flexWrap: modalFilter ? 'wrap' : 'nowrap',
                  }}
                  className={styles.citiesContainer}
                >
                  {country.cities.map((city: any) => (
                    <label
                      style={{ width: modalFilter ? '50%' : '100%' }}
                      key={city.id}
                      className={styles.label2}
                    >
                      <div className={styles.nameFilter}>
                        <input
                          style={{
                            width: modalFilter ? '20px' : '14px',
                            height: modalFilter ? '20px' : '14px',
                          }}
                          type="checkbox"
                          name="city"
                          checked={city.id === selectedCity}
                          onChange={() => handleCitySelection(city.id)}
                        />

                        <span
                          style={{
                            color: modalFilter ? 'white' : '#11072d',
                            fontSize: modalFilter ? '20px' : '17px',
                          }}
                        >
                          {city.name}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default FilterCountry;
