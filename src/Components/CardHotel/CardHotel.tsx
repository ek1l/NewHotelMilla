/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const limitTitle = 20;
  const truncatedName =
    name.length > limitTitle ? `${name.slice(0, limitTitle)}...` : name;

  const firstThreeFacilities = facilities.slice(0, 8);

  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const description =
    accomoditation.length > 122
      ? `${capitalizeFirstLetter(accomoditation.slice(0, 200))}...`
      : capitalizeFirstLetter(accomoditation);

  return (
    <Link className={styles.link} to={`/offers/${id}`}>
      <div className={`${styles.cardHotel}`}>
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
            <p>{description}</p>
          </div>
          <div className={styles.categories}>
            {firstThreeFacilities.map((facility: any) => (
              <div className={styles.category} key={facility.id}>
                <p>{facility.facility}</p>
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
