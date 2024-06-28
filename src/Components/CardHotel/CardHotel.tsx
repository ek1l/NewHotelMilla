/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import styles from './CardHotel.module.scss';
import { Link } from 'react-router-dom';
import IMGCardHotelArrow from '../../assets/img/arrowCardHotelView.png';

const CardHotel = ({
  id,
  name,
  country,
  cities,
  facilities,
  accomoditation,
  image,
}: any) => {
  const limitTitle = 100;
  const truncatedName =
    name.length > limitTitle ? `${name.slice(0, limitTitle)}...` : name;

  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const maxFacilities = isMobile ? 3 : 8;
  const firstFacilities = facilities.slice(0, maxFacilities);

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const truncatedAccomodation =
    accomoditation.length > 122
      ? `${capitalizeFirstLetter(accomoditation.slice(0, 80))}...`
      : capitalizeFirstLetter(accomoditation);

  const truncateFacility = (facility: string, isMobile: boolean) => {
    const limit = isMobile ? 10 : 20;
    return facility.length > limit
      ? `${facility.slice(0, limit)}...`
      : facility;
  };

  return (
    <Link className={styles.link} to={`/offers/${id}`}>
      <div className={styles.cardHotel}>
        <div className={styles.imagem}>
          <img
            className={styles.photoHotelAtt}
            src={`${import.meta.env.VITE_APP_API_IMAGE}/${image}`}
            alt="Foto Hotel"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.nameAndLocal}>
            <h1>
              {truncatedName.replace(/^\w/, (c: string) => c.toUpperCase())}
            </h1>
            <p>
              {country}, {cities}
            </p>
          </div>
          <div className={styles.description}>
            <p>{truncatedAccomodation}</p>
          </div>
          <div className={styles.categories}>
            {firstFacilities.map((facility: any) => (
              <div className={styles.category} key={facility.id}>
                <p>{truncateFacility(facility.facility, isMobile)}</p>
              </div>
            ))}
          </div>
          <div className={styles.stars}>
            <button className={styles.starsButton}>
              View <img src={IMGCardHotelArrow} alt="Arrow" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardHotel;
