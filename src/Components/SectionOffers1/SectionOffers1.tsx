/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styles from './SectionOffers.module.scss';
import SearchIMG from '../../assets/img/searchInputOurTeam.png';
import CardHotel from '../CardHotel/CardHotel';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import IMGFilter from '../../assets/img/adidas.png';
import { getAllSports } from '../../redux/reducers/getAllSports';
import Filter from '../CardFilterSport/CardFilterSport';
import { getAllCountry } from '../../redux/reducers/getAllCountry';
import FilterCountry from '../FilterCountry/FilterCountry';
import { getAllFacilities } from '../../redux/reducers/getAllFacilities';
import { getAllCondition } from '../../redux/reducers/getAllCondition';
import { getAllTravelTime } from '../../redux/reducers/getAllNewTravelTime';
import { getAllhotels } from '../../redux/reducers/getAllHotels';
import ModalFilter from '../ModalFilter/ModalFilter';
import { getAllRatings } from '../../redux/reducers/getAllRating';

const SectionOffers1 = () => {
  const dispatch = useAppDispatch();
  const { dutch } = useAppSelector((state) => state.changeIdiomaSlice);
  const { data } = useAppSelector(
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
  const { data: hotelData } = useAppSelector(
    (state: { getAllhotelsSlice: any }) => state.getAllhotelsSlice,
  );
  const { data: ratingsData } = useAppSelector(
    (state) => state.getAllRatingsSlice,
  );

  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const hotelsPerPage = 6;
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;

  const filteredHotels = hotelData.filter((hotel: any) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const currentHotels = filteredHotels.slice(
    indexOfFirstHotel,
    indexOfLastHotel,
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const totalPages = Math.ceil(filteredHotels.length / hotelsPerPage);

  let pages = [];
  if (totalPages <= 4) {
    pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  } else {
    if (currentPage <= 3) {
      pages = [1, 2, 3, 4, '...'];
    } else if (currentPage >= totalPages - 2) {
      pages = [
        '...',
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      pages = [
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      ];
    }
  }
  const handleSetOpenFilterModal = () => {
    setOpenFilterModal(!openFilterModal);
  };

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
    if (ratingsData.length === 0) {
      dispatch(getAllRatings());
    }
    dispatch(getAllhotels());
  }, [
    conditionsData.length,
    countryData.length,
    data.length,
    dispatch,
    ratingsData.length,
    facilitiesData.length,
    travelTimeData.length,
  ]);

  return (
    <section className={styles.section}>
      <ModalFilter
        openFilterModal={openFilterModal}
        handleSetOpenFilterModal={handleSetOpenFilterModal}
      />
      <div className={styles.titleAndSearch}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder={dutch ? 'Zoek' : 'Search'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={SearchIMG} alt="searchIcon" />
        </div>
        <button
          onClick={handleSetOpenFilterModal}
          className={styles.buttonFilter}
        >
          <img src={IMGFilter} alt="Filter button icon" />
        </button>
      </div>
      <div className={styles.containerSection}>
        <div className={styles.containerInputsFilterSelect}></div>
        <div className={styles.hotelsAndFilters}>
          {hotelData.length > 0 ? (
            <div className={styles.container}>
              <div className={styles.containerHoteis}>
                {currentHotels.map((hotel: any) => (
                  <CardHotelMemo
                    id={hotel.id}
                    image={hotel.images[0].path}
                    name={hotel.name}
                    country={hotel.city.country.name}
                    cities={hotel.city.name}
                    facilities={hotel.facilities}
                    accomoditation={hotel.description.accommodation}
                    key={hotel.id}
                  />
                ))}
              </div>
              <div className={styles.pagination}>
                {pages.map((page, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (typeof page === 'number') {
                        paginate(page);
                      }
                    }}
                    className={
                      currentPage === page
                        ? 'ativobotaopagination'
                        : `${styles.botaoPaginationStyle}`
                    }
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
          {data.length > 0 ? (
            <div className={styles.filter}>
              <div className={styles.titleFilter}>
                <h2>{dutch ? 'Filter' : 'Filter by'}</h2>
              </div>
              <div className={styles.containerFilter}>
                <div className={styles.cardFilter}>
                  <h3>{dutch ? 'Sport' : 'Sport'}</h3>
                  <Filter modalFilter={false} data={data} />
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
          ) : (
            <h2>Loading filters...</h2>
          )}
        </div>
      </div>
    </section>
  );
};

const CardHotelMemo = React.memo(CardHotel);

export default SectionOffers1;
