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

  useEffect(() => {
    if (filteredHotels.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(
          (prevIndex) =>
            (prevIndex + 1) %
            Math.ceil(
              filteredHotels.length /
                (windowWidth <= 900 ? 1 : windowWidth <= 1175 ? 2 : 3),
            ),
        );
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [filteredHotels.length, windowWidth]);

  const groupedHotels = [];
  const cardsPerGroup = windowWidth <= 900 ? 1 : windowWidth <= 1175 ? 2 : 3;
  if (filteredHotels.length > 0) {
    for (let i = 0; i < filteredHotels.length; i += cardsPerGroup) {
      groupedHotels.push(filteredHotels.slice(i, i + cardsPerGroup));
    }
  }

  return (
    <section className={`${styles.section}`}>
      <div className={styles.containerSection2}>
        <div className={styles.textAndDescription}>
          <h1 className={styles.title}>Super deals</h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua
          </p>
        </div>
        <div className={`${styles.carrossel}`}>
          {groupedHotels.length > 0 && (
            <div className={`${styles.carouselInner}`}>
              {groupedHotels[currentIndex].map((hotel: any) => (
                <CardHotelHome
                  name={hotel.name}
                  stars={hotel.ratings.rating
                    .replace('Sterren', '')
                    .replace('Stars', '')
                    .replace('Star', '')
                    .replace('stars', '')
                    .replace('star', '')}
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
        <div className={styles.carouselIndicators}>
          {groupedHotels.map((_, index) => (
            <span
              key={index}
              className={`${styles.indicator} ${
                currentIndex === index ? styles.active : ''
              }`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionHome2;
