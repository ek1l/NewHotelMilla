/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './CardHotelHome.module.scss';
import IMGHotelCardHomeTeste from '../../assets/testeIMG/hotelCardHomeTeste.webp';
import IMGStarHome from '../../assets/img/starHotel.png';
import IMGBallDescription from '../../assets/img/ballDescription.png';
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
}: any) => {
  const filstersArr = [`${filtersDay}`, `${filtersCondition}`];

  return (
    <div className={`${styles.containerCardHome} animationCarroussel`}>
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
            {Array(stars)
              .fill(0)
              .map((_, __) => (
                <img src={IMGStarHome} alt="star" />
              ))}
          </div>
          <div className={styles.cityAndCountry}>
            <span className={styles.cityCountrySpan}>{city}, </span>
            <span className={styles.cityCountrySpan}> {country}</span>
          </div>
          <div className={styles.descriptionsContainer}>
            <p className={styles.description}>
              <img src={IMGBallDescription} alt="Ball Description" />
              Lorem ipsum dolor sit amet, consectetur adipiscing.
            </p>
            <p className={styles.description}>
              <img src={IMGBallDescription} alt="Ball Description" />
              Lorem ipsum dolor sit amet, consectetur adipiscing.
            </p>
            <p className={styles.description}>
              <img src={IMGBallDescription} alt="Ball Description" />
              Lorem ipsum dolor sit amet, consectetur adipiscing.
            </p>
          </div>
          <div className={styles.filtersContainer}>
            {filstersArr.map((filter) => (
              <span className={styles.filters}>{filter}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHotelHome;
