/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './SectionHome5.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAllhotels } from '../../redux/reducers/getAllHotels';
import CardHotelSimple from '../CardHotelSimple/CardHotelSimple';

const SectionHome5 = () => {
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
          <h1 className={styles.title}>Best locations</h1>
          <p className={styles.description}>
            Our best locations for your trainingcamps
          </p>
        </div>
        <div className={`${styles.carrossel}`}>
          {groupedHotels.length > 0 && (
            <div className={`${styles.carouselInner}`}>
              {groupedHotels[currentIndex].map((hotel: any) => (
                <CardHotelSimple
                  name={hotel.name}
                  city={hotel.city.name}
                  country={hotel.city.country.name}
                  stars={Number(hotel.rating.rating.replace('Sterren', ''))}
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

export default SectionHome5;
