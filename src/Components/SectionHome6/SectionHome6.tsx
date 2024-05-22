/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './SectionHome6.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import BannerCardSimple from '../BannerCardSimple/BannerCardSimple';
import { getAllhotels } from '../../redux/reducers/getAllHotels';

const SectionHome6 = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllhotelsSlice);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    dispatch(getAllhotels());
  }, [dispatch]);

  const filteredHotels = data.filter(
    (hotel: any) => Number(hotel.rating.rating.replace('Sterren', '')) > 1,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % filteredHotels.length,
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredHotels.length]);

  return (
    <section className={`${styles.section}`}>
      <div className={styles.containerSection2}>
        <div className={`${styles.carrossel}`}>
          {filteredHotels.length > 0 && (
            <div className={`${styles.carouselInner}`}>
              <BannerCardSimple />
            </div>
          )}
        </div>
        <div className={styles.carouselIndicators}>
          {filteredHotels.map((_, index) => (
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

export default SectionHome6;
