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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { dutch } = useAppSelector((state) => state.changeIdiomaSlice);
  console.log(data);
  useEffect(() => {
    dispatch(getAllhotels());

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  // Filtrar hotéis com sliderDisplay como true
  const filteredHotels = data.filter((hotel: any) => hotel.sliderDisplay);

  const itemsPerPage = windowWidth >= 1175 ? 3 : windowWidth >= 900 ? 2 : 1;

  const groupedHotels = [];
  for (let i = 0; i < filteredHotels.length; i += itemsPerPage) {
    groupedHotels.push(filteredHotels.slice(i, i + itemsPerPage));
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % groupedHotels.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredHotels.length, groupedHotels.length]);

  return (
    <section className={`${styles.section}`}>
      <div className={styles.containerSection2}>
        <div className={styles.textAndDescription}>
          <div className={styles.titleAndButton}>
            <h1 className={styles.title}>
              {dutch ? 'Beste locaties' : 'Best locations'}
            </h1>
            <Link to="/offers" className={styles.button}>
              {dutch ? 'Zoeken' : 'Search'}
              <img src={IMGSetaButton} alt="Arrow button" />
            </Link>
          </div>
          <p className={styles.description}>
            {dutch
              ? 'Onze beste locaties voor jouw trainingskamp'
              : 'Our best locations for your trainingcamps'}
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
                    hotel.ratings.rating
                      .replace('Sterren', '')
                      .replace('Stars', '')
                      .replace('Star', '')
                      .replace('star', '')
                      .replace('stars', '')
                      .replace('Ster', ''),
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
