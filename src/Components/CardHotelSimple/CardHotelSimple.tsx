/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import styles from './CardHotelSimple.module.scss';
import IMGStar from '../../assets/img/starHotel.png';
const CardHotelSimple = ({ stars, city, country, imagem, name }: any) => {
  return (
    <div className={`${styles.cardHotelSimpleContainer} animationCarroussel`}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={`${import.meta.env.VITE_APP_API_IMAGE}/${imagem}`}
          alt="Hotel Img card"
        />
      </div>
      <div className={styles.infos}>
        <div className={styles.containerIMGStars}>
          <div className={styles.starsContainer}>
            {Array(stars)
              .fill(0)
              .map((_, __) => (
                <img className={styles.stars} src={IMGStar} alt="Star" />
              ))}
          </div>
        </div>
        <div className={styles.titleAndCityAndCountry}>
          <h1 className={styles.title}>{name}</h1>
          <span className={styles.cityAndCountry}>
            {city}, {country}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardHotelSimple;
