/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './CardHotelHome.module.scss';
import IMGStarHome from '../../assets/img/starHotel.png';
import IMGBallDescription from '../../assets/img/ballDescription.png';
import { Link } from 'react-router-dom';

const CardHotelHome = ({
  name,
  stars,
  description1,
  description2,
  description3,
  city,
  country,
  filtersDay,
  imagem,
  filtersCondition,
  id,
}: any) => {
  const filstersArr = [`${filtersDay}`, `${filtersCondition}`];

  const truncateDescription = (description: string) => {
    return description.length > 51
      ? `${description.substring(0, 51)}...`
      : description;
  };

  return (
    <Link
      to={`/offers/${id}`}
      className={`${styles.containerCardHome} animationCarroussel`}
    >
      <div className={styles.imgContainer}>
        <img
          className={styles.imgHotel}
          src={`${import.meta.env.VITE_APP_API_IMAGE}/${imagem}`}
          alt="Photo hotel"
        />
      </div>
      <div className={styles.infos}>
        <div className={styles.containerInfos}>
          <div className={styles.titleAndStars}>
            <h1 className={styles.titleNameHotel}>{name}</h1>
            {typeof stars === 'number' &&
              Array(stars)
                .fill(0)
                .map((_, index) => (
                  <img key={index} src={IMGStarHome} alt="star" />
                ))}
          </div>
          <div className={styles.cityAndCountry}>
            <span className={styles.cityCountrySpan}>{city}, </span>
            <span className={styles.cityCountrySpan}> {country}</span>
          </div>
          <div className={styles.descriptionsContainer}>
            <p className={styles.description}>
              <img src={IMGBallDescription} alt="Ball Description" />
              {truncateDescription(description1)}
            </p>
            <p className={styles.description}>
              <img src={IMGBallDescription} alt="Ball Description" />
              {truncateDescription(description2)}
            </p>
            <p className={styles.description}>
              <img src={IMGBallDescription} alt="Ball Description" />
              {truncateDescription(description3)}
            </p>
          </div>
          <div className={styles.filtersContainer}>
            {filstersArr.map((filter, index) => (
              <span key={index} className={styles.filters}>
                {filter}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardHotelHome;
