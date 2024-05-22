/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './CardHotelHome.module.scss';
import IMGHotelCardHomeTeste from '../../assets/testeIMG/hotelCardHomeTeste.webp';
import IMGStarHome from '../../assets/img/starHotel.png';
import IMGBallDescription from '../../assets/img/ballDescription.png';
const CardHotelHome = (/*{
  name,
  stars,
  description1,
  description2,
  description3,
  city,
  country,
  filters,
}: {
  name: string;
  stars: number;
  description1: string;
  description2: string;
  description3: string;
  city: string;
  country: string;
  filters: string;
} */) => {
  const filstersArr = ['Days', 'Condition'];
  const star = 5;
  return (
    <div className={styles.containerCardHome}>
      <div className={styles.imgContainer}>
        <img
          className={styles.imgHotel}
          src={IMGHotelCardHomeTeste}
          alt="Photo hotel"
        />
      </div>
      <div className={styles.infos}>
        <div className={styles.containerInfos}>
          <div className={styles.titleAndStars}>
            <h1 className={styles.titleNameHotel}>Hotel Name</h1>
            {Array(star)
              .fill(0)
              .map((_, __) => (
                <img src={IMGStarHome} alt="star" />
              ))}
          </div>
          <div className={styles.cityAndCountry}>
            <span className={styles.cityCountrySpan}>City, </span>
            <span className={styles.cityCountrySpan}> Country</span>
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
