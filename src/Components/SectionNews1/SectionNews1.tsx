/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './SectionNews1.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import BannerNews from '../BannerNews/BannerNews';
import { getAllnews } from '../../redux/reducers/getAllNews';

const SectionNews1 = () => {
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.getAllnewsSlice);
  const [currentIndex, setCurrentIndex] = useState(0);
 

  useEffect(() => {
    dispatch(getAllnews());
  }, [dispatch]);

  const filteredHotels = data.slice(0, 5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredHotels.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredHotels.length]);

  return (
    <section className={`${styles.section}`}>
      <div className={styles.containerSection2}>
        <div className={`${styles.carrossel}`}>
          {filteredHotels.length > 0 && (
            <div className={`${styles.carouselInner}`}>
              <BannerNews {...filteredHotels[currentIndex]} />
            </div>
          )}
        </div>
        <div className={styles.carouselIndicators}>
          {filteredHotels.map((_: any, index: number) => (
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

export default SectionNews1;
