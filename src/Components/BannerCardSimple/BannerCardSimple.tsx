/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './BannerCardSimple.module.scss';

const BannerCardSimple = ({
  imagem,
  description,
  title,
  comment,
  author,
}: any) => {
  const truncarString = (string: string, quantidade: number) => {
    if (string.length <= quantidade) {
      return string;
    } else {
      return string.slice(0, quantidade) + '...';
    }
  };
  return (
    <div className={styles.containerBannerCardSimple}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={`${import.meta.env.VITE_APP_API_IMAGE}/${imagem}`}
          alt="Banner IMG"
        />
        <div className={styles.filtro}></div>
      </div>
      <div className={styles.infos}>
        <div className={styles.infoEsquerda}>
          <h1 className={styles.title}>{truncarString(title, 30)}</h1>
          <p className={styles.description}>
            {truncarString(description, 231)}
          </p>
        </div>
        <div className={styles.infoDireita}>
          <div className={styles.infoPContainer}>
            <p className={styles.infoP}>{truncarString(comment, 130)}</p>
          </div>
          <div className={styles.nameAuthorContainer}>
            <h2 className={styles.h2}>{truncarString(author, 17)}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerCardSimple;
