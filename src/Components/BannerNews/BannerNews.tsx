/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './BannerNews.module.scss';
import IMGArrownews from '../../assets/img/arrowCardHotelView.png';
import { Link } from 'react-router-dom';
const BannerNews = ({ ...props }: any) => {
  const { title, banner, description, id } = props;

  const truncarString = (string: string, quantidade: number) => {
    if (string.length <= quantidade) {
      return string;
    } else {
      return string.slice(0, quantidade) + '...';
    }
  };

  const descriptionTruncated = truncarString(description, 218);
  return (
    <div className={styles.containerBannerCardSimple}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={`${import.meta.env.VITE_APP_API_IMAGE}/${banner}`}
          alt="Banner IMG"
        />
        <div className={styles.filtro}></div>
      </div>
      <div className={styles.infos}>
        <div className={styles.infoEsquerda}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{descriptionTruncated}</p>
          <Link to={`/news/${id}`} className={styles.buttonNews}>
            News <img src={IMGArrownews} alt="Arrow Button News" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BannerNews;
