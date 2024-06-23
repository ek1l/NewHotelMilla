/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import styles from './SectionHome1.module.scss';
import IMGCoreanos from '../../assets/img/coreanos.png';
import IMGExcelsius from '../../assets/img/excelsior.png';
import IMGDos from '../../assets/img/dos.png';
import IMGBvv from '../../assets/img/bvv.png';
import IMGAdo from '../../assets/img/ado.png';
import IMGRunning from '../../assets/img/running.png';
import IMGCountry from '../../assets/img/country.png';
import IMGCity from '../../assets/img/city.png';
import IMGArrowsearch from '../../assets/img/arrowSearch.png';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import { getAllCountry } from '../../redux/reducers/getAllCountry';
import { useNavigate } from 'react-router-dom';
import { getAllhotelsParams } from '../../redux/reducers/getAllHotels';
import { getAllSports } from '../../redux/reducers/getAllSports';

const SectionHome1 = () => {
  const dispatch = useAppDispatch();
  const { data: sportData } = useAppSelector(
    (state) => state.getAllSportsSlice,
  );
  const { data: countryData } = useAppSelector(
    (state) => state.getAllCountrySlice,
  );

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [selectedCityId, setSelectedCityId] = useState('');
  const [selectedSportId, setSelectedSportId] = useState('');
  const [citiesByCountry, setCitiesByCountry] = useState([]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    const selectedCountryData = countryData.find(
      (country) => country.name === selectedCountry,
    );
    if (selectedCountryData) {
      // @ts-ignore
      setSelectedCountryId(selectedCountryData.id);
      // @ts-ignore
      setCitiesByCountry(selectedCountryData.cities);
    } else {
      setSelectedCountryId('');
      setCitiesByCountry([]);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCityId = e.target.value;
    setSelectedCityId(selectedCityId);
  };

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSportId = e.target.value;
    setSelectedSportId(selectedSportId);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const queryParams = `&sport=${selectedSportId}&country=${selectedCountryId}&city=${selectedCityId}`;
    navigate('/offers');
    dispatch(getAllhotelsParams(queryParams));
  };

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllSports());
    dispatch(getAllCountry());
  }, [dispatch]);

  return (
    <section className={`${styles.containerBackgroundFundo} animationEntrando`}>
      <div className={styles.imgBackground}>
        <div className={styles.containerSearchAndTimes}>
          <div className={styles.times}>
            <img className={styles.img} src={IMGCoreanos} alt="Coreanos" />
            <img className={styles.img} src={IMGExcelsius} alt="Excelsius" />
            <img className={styles.img} src={IMGDos} alt="Dos" />
            <img className={styles.img} src={IMGBvv} alt="Bvv" />
            <img className={styles.img} src={IMGAdo} alt="Ado" />
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.selectsContainer}>
              <label className={styles.label}>
                <span className={styles.span}>
                  <img src={IMGRunning} alt="running ico" /> Sport
                </span>
                <select
                  name="Sport"
                  onChange={handleSportChange}
                  value={selectedSportId}
                  className={styles.select}
                >
                  <option value="0">Select a sport</option>
                  {sportData.length > 0
                    ? sportData.map((sport) => (
                        <option key={sport.id} value={sport.id}>
                          {sport.sport}
                        </option>
                      ))
                    : null}
                </select>
              </label>

              <label className={styles.label}>
                <span className={styles.span}>
                  <img src={IMGCountry} alt="country ico" /> Country
                </span>
                <select
                  name="Country"
                  onChange={handleCountryChange}
                  value={selectedCountry}
                  className={styles.select}
                >
                  <option value="0">Select a country</option>
                  {countryData.length > 0
                    ? countryData.map((country) => (
                        <option key={country.id} value={country.name}>
                          {country.name}
                        </option>
                      ))
                    : 'No data'}
                </select>
              </label>

              <label className={styles.label}>
                <span className={styles.span}>
                  <img src={IMGCity} alt="city ico" /> City
                </span>
                <select
                  name="City"
                  disabled={!selectedCountry}
                  onChange={handleCityChange}
                  value={selectedCityId}
                  className={styles.select}
                >
                  {citiesByCountry.length > 0 ? (
                    citiesByCountry.map((city: any) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))
                  ) : (
                    <option value="0">Select a country first</option>
                  )}
                </select>
              </label>
            </div>
            <div className={styles.buttonContainer}>
              <button
                type="submit"
                disabled={!selectedCountry || !selectedSportId}
                className={styles.button}
                onClick={handleSubmit}
              >
                {!selectedCountry || !selectedSportId ? 'Select all' : 'Search'}{' '}
                <img src={IMGArrowsearch} alt="Search arrow" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHome1;
