/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './SectionHome6.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import BannerCardSimple from '../BannerCardSimple/BannerCardSimple';
import { getAllSlider } from '../../redux/reducers/getAllSlider';
import { useLocation } from 'react-router-dom';

const SectionHome6 = () => {
  const dispatch = useAppDispatch();
  const { data }: any = useAppSelector((state) => state.getAllSliderSlice);
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  useEffect(() => {
    dispatch(getAllSlider());
  }, [dispatch]);

  useEffect(() => {
    if (location.pathname.startsWith('/admin/login')) {
      return;
    } else {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [data.length, location.pathname]);

  return (
    <section className={`${styles.section}`}>
      <div className={styles.containerSection2}>
        <div className={`${styles.carrossel}`}>
          {data.length > 0 ? (
            <div className={`${styles.carouselInner}`}>
              <BannerCardSimple
                id={data[currentIndex].id}
                key={data[currentIndex].id}
                title={data[currentIndex].title}
                description={data[currentIndex].information}
                imagem={data[currentIndex].image}
                comment={data[currentIndex].comment}
                author={data[currentIndex].author}
              />
            </div>
          ) : null}
        </div>
        <div className={styles.carouselIndicators}>
          {data.map((_: any, index: any) => (
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
