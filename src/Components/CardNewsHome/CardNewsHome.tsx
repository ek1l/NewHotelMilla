/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './CardNews.module.scss';
import IMGArrowNews from '../../assets/img/ArrowNews.png';
import { Link } from 'react-router-dom';
const CardNewsHome = ({
  title,
  description,
  author,
  date,
  banner,
  id,
}: any) => {
  const truncarString = (string: string, quantidade: number) => {
    if (string.length <= quantidade) {
      return string;
    } else {
      return string.slice(0, quantidade) + '...';
    }
  };
  const partes = date.split('T');
  const data = partes[0];
  const hora = partes[1].slice(0, 8);
  const [dia, mes, ano] = data.split('-');
  const dataFormatada = `${dia}/${mes}/${ano} ${hora}`;
  const titleFormatado = truncarString(title, 15);
  const descriptionFormatada = truncarString(description, 240);
  const authorFormatado = truncarString(author, 20);
  return (
    <Link to={`/news/${id}`} className={styles.cardNewsContainer}>
      <div className={styles.imgBackGroundCountainer}>
        <img
          className={styles.img}
          src={`${import.meta.env.VITE_APP_API_IMAGE}/${banner}`}
          alt="News"
        />
        <div className={styles.filtro}></div>
      </div>
      <div className={styles.titleAndDescriptionAndArrow}>
        <div className={styles.titleAndDescription}>
          <h1 className={styles.title}>{titleFormatado}</h1>
          <div className={styles.descriptionContainer}>
            <p className={styles.description}>{descriptionFormatada}</p>
          </div>
        </div>
        <button className={styles.buttonArrow}>
          <img
            className={styles.imgArrow}
            src={IMGArrowNews}
            alt="Arrow news Button"
          />
        </button>
      </div>
      <div className={styles.authorAndDateContainer}>
        <span className={styles.authorAndDate}>
          {authorFormatado}, {dataFormatada}
        </span>
      </div>
    </Link>
  );
};

export default CardNewsHome;
