/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import CardHotelHome from '../CardHotelHome/CardHotelHome';
import styles from './SectionHome2.module.scss';
import { getAllhotels } from '../../redux/reducers/getAllHotels';

const SectionHome2 = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllhotelsSlice);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [indicatorPage, setIndicatorPage] = useState(0);

  useEffect(() => {
    dispatch(getAllhotels());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredHotels = data.filter((hotel: any) => hotel.promotion === true);

  const groupedHotels = [];
  const cardsPerGroup = windowWidth <= 900 ? 1 : windowWidth <= 1175 ? 2 : 3;
  if (filteredHotels.length > 0) {
    for (let i = 0; i < filteredHotels.length; i += cardsPerGroup) {
      groupedHotels.push(filteredHotels.slice(i, i + cardsPerGroup));
    }
  }

  const maxIndicators = 5;
  const totalPages = Math.ceil(groupedHotels.length / maxIndicators);

  useEffect(() => {
    if (windowWidth <= 900 && groupedHotels.length > maxIndicators) {
      const indicatorInterval = setInterval(() => {
        setIndicatorPage((prevPage) => (prevPage + 1) % totalPages);
      }, 4000);
      return () => clearInterval(indicatorInterval);
    }
  }, [windowWidth, groupedHotels.length, totalPages]);

  const handleIndicatorClick = (index: any) => {
    setCurrentIndex(index);
    setIndicatorPage(Math.floor(index / maxIndicators));
  };

  const renderIndicators = () => {
    const start = indicatorPage * maxIndicators;
    const end = Math.min(start + maxIndicators, groupedHotels.length);
    const indicators = [];

    for (let i = start; i < end; i++) {
      indicators.push(
        <span
          key={i}
          className={`${styles.indicator} ${
            currentIndex === i ? styles.active : ''
          }`}
          onClick={() => handleIndicatorClick(i)}
        ></span>,
      );
    }
    return indicators;
  };
  useEffect(() => {
    if (filteredHotels.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % groupedHotels.length;
          setIndicatorPage(Math.floor(newIndex / maxIndicators));
          return newIndex;
        });
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [filteredHotels.length, groupedHotels.length, windowWidth]);
  return (
    <section className={`${styles.section}`}>
      <div className={styles.containerSection2}>
        <div className={styles.textAndDescription}>
          <h1 className={styles.title}>Superdeals</h1>
          <p className={styles.description}>
            Profiteer nu van onze superdeals en ga voor de goedkoopste prijs op
            trainingskamp!
          </p>
        </div>
        <div className={`${styles.carrossel}`}>
          {groupedHotels.length > 0 && (
            <div className={`${styles.carouselInner}`}>
              {groupedHotels[currentIndex].map((hotel: any) => (
                <CardHotelHome
                  name={hotel.name}
                  stars={hotel.ratings.rating
                    .replace(/Ster(ren|s|r|)/i, '')
                    .trim()}
                  description1={hotel.card.description1}
                  description2={hotel.card.description2}
                  description3={hotel.card.description3}
                  city={hotel.city.name}
                  country={hotel.city.country.name}
                  filtersDay={hotel.travelTime[0]?.travel_time}
                  filtersCondition={hotel.conditions[0]?.condition}
                  imagem={hotel.images[0]?.path}
                  key={hotel.id}
                  id={hotel.id}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.carouselIndicators}>{renderIndicators()}</div>
      </div>
    </section>
  );
};

export default SectionHome2;
