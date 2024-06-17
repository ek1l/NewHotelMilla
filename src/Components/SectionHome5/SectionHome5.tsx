/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './SectionHome5.module.scss';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAllhotels } from '../../redux/reducers/getAllHotels';
import CardHotelSimple from '../CardHotelSimple/CardHotelSimple';
import IMGSetaButton from '../../assets/img/arrowSearch.png';
import { Link } from 'react-router-dom';

const SectionHome5 = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.getAllhotelsSlice);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getAllhotels());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Math.ceil(data.length / 3),
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [data.length]);

  const groupedHotels = [];
  for (let i = 0; i < data.length; i += 3) {
    groupedHotels.push(data.slice(i, i + 3));
  }

  return (
    <section className={`${styles.section}`}>
      <div className={styles.containerSection2}>
        <div className={styles.textAndDescription}>
          <div className={styles.titleAndButton}>
            <h1 className={styles.title}>Best locations</h1>
            <Link to="/offers" className={styles.button}>
              Search
              <img src={IMGSetaButton} alt="Arrow button" />
            </Link>
          </div>
          <p className={styles.description}>
            Our best locations for your training camps
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
                  stars={Number(
                    hotel.rating.rating
                      .replace('Sterren', '')
                      .replace('Stars', '')
                      .replace('Star', ''),
                  )}
                  imagem={hotel.images[0].path}
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

export default SectionHome5;
