/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './SectionHotelUnique1.module.scss';
import arrowBack from '../../assets/img/arrowInputSelect.png';
import IMGStars from '../../assets/img/starHotel.png';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getOneHotel } from '../../redux/reducers/getOneHotel';

const SectionHotelUnique1 = () => {
  const dispatch = useAppDispatch();
  const { data }: { data: any } = useAppSelector(
    (state) => state.getOneHotelSlice,
  );
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    dispatch(getOneHotel(String(id)));
  }, [dispatch, id]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? data[0].images.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === data[0].images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className={styles.section}>
      {data.length > 0 ? (
        <div className={styles.containerSection}>
          <div className={styles.offersAndHotelNameAndStarAndCityAndCountry}>
            <Link className={styles.link} to="/offers">
              <img
                className={styles.arrowBack}
                src={arrowBack}
                alt="BackButton"
              />
              Offers
            </Link>
            <div className={styles.hotelNameAndStars}>
              <h1 className={styles.hotelName}>{data[0].name}</h1>
              {Array(Number(data[0].rating.rating[0]))
                .fill(0)
                .map((_, index) => (
                  <img
                    key={index}
                    className={styles.stars}
                    src={IMGStars}
                    alt="Stars"
                  />
                ))}
            </div>
            <div className={styles.cityAndCountry}>
              <span className={styles.cityAndCountrySpan}>
                {data[0].city.name}, {data[0].city.country.name}
              </span>
            </div>
          </div>
          <div className={styles.carroussel}>
            <button className={styles.arrow} onClick={handlePrevClick}></button>
            <div className={styles.imageContainer}>
              <img
                className={styles.imgCarroussel}
                src={`${import.meta.env.VITE_APP_API_IMAGE}/${
                  data[0].images[currentImageIndex].path
                }`}
                alt="CarrousselIMG"
              />
            </div>
            <button className={styles.arrow} onClick={handleNextClick}></button>
            <div className={styles.thumbnails}>
              {data[0].images.map((image: any, index: number) => (
                <img
                  key={image.id}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.active : ''
                  }`}
                  src={`${import.meta.env.VITE_APP_API_IMAGE}/${image.path}`}
                  alt={`Thumbnail-${index}`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default SectionHotelUnique1;
