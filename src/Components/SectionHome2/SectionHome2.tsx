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
  useEffect(() => {
    dispatch(getAllhotels());
  }, [dispatch]);
  const filteredHotels = data.filter(
    (hotel: any) => Number(hotel.rating.rating.replace('Sterren', '')) === 5,
  );
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Math.ceil(filteredHotels.length / 3),
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredHotels.length]);

  const groupedHotels = [];
  for (let i = 0; i < filteredHotels.length; i += 3) {
    groupedHotels.push(filteredHotels.slice(i, i + 3));
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
                  stars={Number(hotel.rating.rating.replace('Sterren', ''))}
                  city={hotel.city.name}
                  country={hotel.city.country.name}
                  filtersDay={hotel.travelTime[0].travelTime}
                  filtersCondition={hotel.condition[0].condition}
                  imagem={hotel.images[0].path}
                  key={hotel.id}
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
